package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func writeJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

func requestHandler(handler APIFunc) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		log.Printf("[INFO] received request: %s %s", request.Method, request.URL.Path)

		if err := handler(response, request); err != nil {
			log.Printf("[ERROR] error handling request: %v", err)
			writeJSON(response, http.StatusInternalServerError, APIError{Error: "Internal server error"})
		}
	}
}

func (server *APIServer) handleNewTicket(response http.ResponseWriter, request *http.Request) error {
	if request.Method != "POST" {
		http.Error(response, "Only POST method is allowed", http.StatusMethodNotAllowed)
		return nil
	}

	var ticketInput struct {
		CustomerName  string `json:"customer_name"`
		CustomerEmail string `json:"customer_email"`
		Description   string `json:"description"`
	}
	err := json.NewDecoder(request.Body).Decode(&ticketInput)
	if err != nil {
		return err
	}
	var id string
	err = db.QueryRow(`
        INSERT INTO ticket (
            description, 
            customer_name, 
            customer_email)
        VALUES ($1, $2, $3)
        RETURNING id`,
		ticketInput.Description,
		ticketInput.CustomerName,
		ticketInput.CustomerEmail).Scan(&id)
	if err != nil {
		return err
	}

	return writeJSON(response, http.StatusCreated, map[string]string{"ticketID": id})
}

func (server *APIServer) handleUpdateTicketStatus(response http.ResponseWriter, request *http.Request) error {
	return nil
}

func (server *APIServer) handleTicketById(response http.ResponseWriter, request *http.Request) error {
	return nil
}

func (server *APIServer) handleAllTickets(response http.ResponseWriter, request *http.Request) error {
	return nil
}
