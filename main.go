package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Serve static files from the current directory
	fs := http.FileServer(http.Dir("./web"))

	http.Handle("/", fs)

	fmt.Println("Server started at http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		fmt.Println("Error:", err)
	}
}
