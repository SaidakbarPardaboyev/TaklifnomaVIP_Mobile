package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net/http"
	"path"

	"taklifnomavip_mobile/backend/config"
	"taklifnomavip_mobile/backend/pkg/logger"
)

/*
 |--------------------------------------------------------------
 | 1.  build → mobile/web  (../../ hisoblanadi, chunki
 |     main.go   ↩︎  backend/cmd/
 |--------------------------------------------------------------
*/
//go:embed all:web
var embeddedFS embed.FS

func main() {
	cfg := config.Load()
	log := logger.New(cfg.LogLevel, "taklifnomavip/")

	/*
	 |  embeddedFS’ning ichida "mobile/web" katalogi paydo bo‘ldi.
	 |  fs.Sub() ga endi **faqat shu nomni** beramiz
	*/
	web, err := fs.Sub(embeddedFS, "mobile/web")
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

	addr := cfg.HttpHost + ":" + cfg.HttpPort
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

		// Fayl bor-yo‘qligini tekshiramiz (mobile/web/…)
		if _, err := fs.Stat(embeddedFS, path.Join("mobile/web", r.URL.Path)); err == nil {
			next.ServeHTTP(w, r)
			return
		}

		// SPA fallback
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")

		r.URL.Path = "/index.html"
		next.ServeHTTP(w, r)
	}
}