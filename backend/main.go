package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

var db *sql.DB

func main() {
	addr := ":" + os.Getenv("PORT")
	dbUrl := os.Getenv("DATABASE_URL")

	log.Printf("[INFO] connecting to database server on: %v", dbUrl)
	var err error
	db, err = sql.Open("postgres", dbUrl)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	server := NewAPIServer(addr)
	server.Run()
}

func (server *APIServer) Run() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /tickets/", requestHandler(server.handleNewTicket))
	mux.HandleFunc("GET /tickets/", requestHandler(server.handleAllTickets))
	mux.HandleFunc("GET /tickets/{id}", requestHandler(server.handleTicketById))
	mux.HandleFunc("PUT /tickets/{id}/status", requestHandler(server.handleUpdateTicketStatus))

	origins := []string{os.Getenv("CORS_ORIGIN")}
	log.Printf("CORS Origins: %v", origins)
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   origins,
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
	})

	log.Printf("[INFO] starting server on port%v", server.listenAddress)
	if err := http.ListenAndServe(server.listenAddress, corsHandler.Handler(mux)); err != nil {
		log.Fatalf("[ERROR] server failed to start: %v", err)
	}
}

type APIServer struct {
	listenAddress string
}

type APIFunc func(http.ResponseWriter, *http.Request) error

type APIError struct {
	Error string `json:"error"`
}

func NewAPIServer(address string) *APIServer {
	return &APIServer{
		listenAddress: address,
	}
}
