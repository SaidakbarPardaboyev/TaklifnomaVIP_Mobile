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

	webDir := "./mobile/web"

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(webDir, r.URL.Path)

		if _, err := os.Stat(path); err == nil && !isDir(path) {
			http.ServeFile(w, r, path)
			return
		}

		http.ServeFile(w, r, filepath.Join(webDir, "index.html"))
	})

	fmt.Println("Server started at http://" + cfg.HttpHost + ":" + cfg.HttpPort)
	err := http.ListenAndServe(cfg.HttpHost+":"+cfg.HttpPort, nil)
	if err != nil {
		log.Error(fmt.Sprintf("Error on server start: %v", err))
	}
}

func isDir(path string) bool {
	fi, err := os.Stat(path)
	if err != nil {
		return false
	}
	return fi.IsDir()
}
