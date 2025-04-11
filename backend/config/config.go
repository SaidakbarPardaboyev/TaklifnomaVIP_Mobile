package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/spf13/cast"
)

// Config ...
type Config struct {
	LogLevel string

	HttpHost string
	HttpPort string
}

// Load loads environment vars and inflates Config
func Load() Config {
	if err := godotenv.Load(".env"); err != nil {
		log.Print("No .env file found")
	}

	config := Config{}
	config.HttpPort = cast.ToString(getOrReturnDefault("HTTP_PORT", "8081"))
	config.LogLevel = cast.ToString(getOrReturnDefault("LOG_LEVEL", "debug"))

	return config
}

func getOrReturnDefault(key string, defaultValue interface{}) interface{} {
	_, exists := os.LookupEnv(key)
	if exists {
		return os.Getenv(key)
	}

	return defaultValue
}
