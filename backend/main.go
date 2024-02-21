package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	addr := ":8000"

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
