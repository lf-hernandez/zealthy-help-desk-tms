package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	addr := os.Getenv("PORT")

	http.HandleFunc("/", handleRoot)

	log.Printf("[INFO] starting server on port %v", addr)
	if err := http.ListenAndServe(addr, nil); err != nil {
		log.Fatalf("[ERROR] server failed to start: %v", err)
	}
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	log.Printf("[INFO ] received request at /")

	fmt.Fprintf(w, "Server is working!")
}
