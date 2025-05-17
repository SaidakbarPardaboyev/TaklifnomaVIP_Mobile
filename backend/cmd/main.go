package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"taklifnomavip_mobile/backend/config"
	"taklifnomavip_mobile/backend/pkg/logger"
)

func main() {
	cfg := config.Load()
	log := logger.New(cfg.LogLevel, "taklifnomavip/")

	webDir := "/mobile/web" // Updated to absolute path in container

	// Add health check endpoint
	http.HandleFunc("/healthcheck", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Serve static files
	fs := http.FileServer(http.Dir(webDir))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Log incoming requests
		log.Info(fmt.Sprintf("Request: %s %s", r.Method, r.URL.Path))

		path := filepath.Join(webDir, r.URL.Path)

		// Check if file exists and is not a directory
		if info, err := os.Stat(path); err == nil && !info.IsDir() {
			fs.ServeHTTP(w, r)
			return
		}

		// For all other routes, serve index.html
		indexFile := filepath.Join(webDir, "index.html")
		if _, err := os.Stat(indexFile); err != nil {
			log.Error(fmt.Sprintf("index.html not found: %v", err))
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

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
