package main

import (
	"fmt"
	"net/http"

	"taklifnomavip_mobile/backend/config"
	"taklifnomavip_mobile/backend/pkg/logger"
)

func main() {
	cfg := config.Load()

	log := logger.New(cfg.LogLevel, "taklifnomavip/")

	// Serve static files from the current directory
	fs := http.FileServer(http.Dir("./mobile/web"))

	http.Handle("/", fs)

	fmt.Println("Server started at http://" + cfg.HttpHost + ":" + cfg.HttpPort)
	err := http.ListenAndServe(cfg.HttpHost+":"+cfg.HttpPort, nil)
	if err != nil {
		log.Error(fmt.Sprintf("Error on server start %v\n", err))
	}
}
