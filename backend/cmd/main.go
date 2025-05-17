package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"taklifnomavip_mobile/backend/config"
	"taklifnomavip_mobile/backend/pkg/logger"
)

func main() {
	cfg := config.Load()
	log := logger.New(cfg.LogLevel, "taklifnomavip/")

	webDir := "/mobile/web"

	// Add health check endpoint
	http.HandleFunc("/healthcheck", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Create file server handler
	fs := http.FileServer(http.Dir(webDir))

	// Main handler for all routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Log incoming requests
		log.Info(fmt.Sprintf("Request: %s %s", r.Method, r.URL.Path))

		// Handle static files first
		if strings.HasPrefix(r.URL.Path, "/assets/") ||
			strings.HasPrefix(r.URL.Path, "/icons/") ||
			strings.HasSuffix(r.URL.Path, ".js") ||
			strings.HasSuffix(r.URL.Path, ".json") ||
			strings.HasSuffix(r.URL.Path, ".png") ||
			strings.HasSuffix(r.URL.Path, ".ico") ||
			strings.HasSuffix(r.URL.Path, ".css") {
			fs.ServeHTTP(w, r)
			return
		}

		// For all other routes, serve index.html
		indexFile := filepath.Join(webDir, "index.html")
		if _, err := os.Stat(indexFile); err != nil {
			log.Error(fmt.Sprintf("index.html not found at %s: %v", indexFile, err))
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Set headers for no caching
		w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		w.Header().Set("Pragma", "no-cache")
		w.Header().Set("Expires", "0")

		http.ServeFile(w, r, indexFile)
	})

	serverAddr := cfg.HttpHost + ":" + cfg.HttpPort
	fmt.Printf("Server started at http://%s\n", serverAddr)

	if err := http.ListenAndServe(serverAddr, nil); err != nil {
		log.Error(fmt.Sprintf("Error on server start: %v", err))
		os.Exit(1)
	}
}

func isDir(path string) bool {
	fi, err := os.Stat(path)
	if err != nil {
		return false
	}
	return fi.IsDir()
}
