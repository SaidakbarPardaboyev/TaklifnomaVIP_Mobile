package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"path"
	"os"

	"github.com/joho/godotenv"
	"taklifnomavip_mobile/backend/pkg/logger"
)

/*
 |--------------------------------------------------------------
 | 1.  build → mobile/web  (../../ hisoblanadi, chunki
 |     main.go   ↩︎  backend/cmd/
 |--------------------------------------------------------------
 |  embeddedFS’ning ichida "web" katalogi paydo bo‘ldi.
 |  fs.Sub() ga endi **faqat shu nomni** beramiz
 |--------------------------------------------------------------
*/
//go:embed all:web
var embeddedFS embed.FS

func main() {
	// Load variables from .env file (ignore error if file is absent)
	_ = godotenv.Load()

	// Read runtime configuration from environment (populated via .env if present)
	logLevel := os.Getenv("LOG_LEVEL")
	if logLevel == "" {
		logLevel = "info"
	}
	log := logger.New(logLevel, "taklifnomavip/")

	web, err := fs.Sub(embeddedFS, "web")
	if err != nil {
		log.Fatal(fmt.Sprintf("embed FS xatosi: %v", err))
	}

	mux := http.NewServeMux()

	// Healthcheck
	mux.HandleFunc("/healthcheck", func(w http.ResponseWriter, _ *http.Request) {
		w.Write([]byte("OK"))
	})

	// Statik fayllar + SPA fallback
	fileServer := http.FileServer(http.FS(web))
	mux.Handle("/", spaHandler(fileServer))

	port := os.Getenv("HTTP_PORT")
	if port == "" {
		port = "8081"
	}
	host := os.Getenv("HTTP_HOST") // empty = all interfaces
	addr := host + ":" + port
	log.Info("Server started at http://" + addr)

	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Error(fmt.Sprintf("ListenAndServe xatosi: %v", err))
	}
}

func spaHandler(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			next.ServeHTTP(w, r)
			return
		}

		requestedPath := path.Join("web", r.URL.Path)

		// 1️⃣ Agar fayl mavjud bo‘lsa, bevosita xizmat qilamiz
		if _, err := fs.Stat(embeddedFS, requestedPath); err == nil {
			next.ServeHTTP(w, r)
			return
		}

		// 2️⃣ Faqat .html bo‘lgan URL uchun 404 qaytaramiz (fallback emas)
		if path.Ext(r.URL.Path) == ".html" {
			http.NotFound(w, r)
			return
		}

		// 3️⃣ Fallback to index.html
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")

		r.URL.Path = "/index.html"
		next.ServeHTTP(w, r)
	}
}