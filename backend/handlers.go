package main

import (
	"database/sql"
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
	if request.Method != "PUT" {
		http.Error(response, "Only PUT method is allowed", http.StatusMethodNotAllowed)
		return nil
	}

	id := request.PathValue("id")

	var (
		ticketToUpdate        Ticket
		employeeName          sql.NullString
		resolutionDescription sql.NullString
	)
	err := db.QueryRow(`
        SELECT 
			id, 
			description,
			created_at,
			modified_at, 
			customer_name, 
			customer_email, 
			status,
			employee_name,
			resolution_description
        FROM ticket 
        WHERE id = $1`, id).
		Scan(&ticketToUpdate.ID,
			&ticketToUpdate.Description,
			&ticketToUpdate.DateCreated,
			&ticketToUpdate.LastModified,
			&ticketToUpdate.CustomerEmail,
			&ticketToUpdate.CustomerName,
			&ticketToUpdate.Status,
			&employeeName,
			&resolutionDescription,
		)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(response, "Ticket not found", http.StatusNotFound)
			return nil
		}
		return err
	}

	var ticketInput struct {
		Status                string `json:"status"`
		EmployeeName          string `json:"employee_name"`
		ResolutionDescription string `json:"resolution_description"`
	}
	err = json.NewDecoder(request.Body).Decode(&ticketInput)
	if err != nil {
		http.Error(response, "Bad request", http.StatusBadRequest)
	}

	_, err = db.Exec(`
		UPDATE ticket 
		SET status = $1, 
			employee_name = $2,
			resolution_description = $3
		WHERE id = $4`,
		ticketInput.Status,
		ticketInput.EmployeeName,
		ticketInput.ResolutionDescription,
		id)
	if err != nil {
		log.Printf("[ERROR] failed to update ticket: %v", err)
		http.Error(response, "Internal server error", http.StatusInternalServerError)
		return nil
	}

	var updatedTicket Ticket
	err = db.QueryRow(`
        SELECT 
			id, 
			description,
			created_at,
			modified_at, 
			customer_name, 
			customer_email, 
			status,
			employee_name,
			resolution_description
        FROM ticket 
        WHERE id = $1`, id).
		Scan(&updatedTicket.ID,
			&updatedTicket.Description,
			&updatedTicket.DateCreated,
			&updatedTicket.LastModified,
			&updatedTicket.CustomerEmail,
			&updatedTicket.CustomerName,
			&updatedTicket.Status,
			&updatedTicket.EmployeeName,
			&updatedTicket.ResolutionDescription,
		)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(response, "Ticket not found", http.StatusNotFound)
			return nil
		}
		return err
	}

	return writeJSON(response, http.StatusOK, updatedTicket)
}

func (server *APIServer) handleTicketById(response http.ResponseWriter, request *http.Request) error {
	if request.Method != "GET" {
		http.Error(response, "Only GET method is allowed", http.StatusMethodNotAllowed)
		return nil
	}

	id := request.PathValue("id")

	var (
		ticket                Ticket
		employeeName          sql.NullString
		resolutionDescription sql.NullString
	)
	err := db.QueryRow(`SELECT 
						id, 
						description, 
						created_at, 
						modified_at, 
						customer_name, 
						customer_email, 
						status,
						employee_name,
						resolution_description
					FROM ticket 
					WHERE id = $1`, id).
		Scan(&ticket.ID,
			&ticket.Description,
			&ticket.DateCreated,
			&ticket.LastModified,
			&ticket.CustomerName,
			&ticket.CustomerName,
			&ticket.Status,
			&employeeName,
			&resolutionDescription,
		)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(response, "Ticket not found", http.StatusNotFound)
			return nil
		}
		return err
	}

	if employeeName.Valid {
		ticket.EmployeeName = employeeName.String
	}
	if resolutionDescription.Valid {
		ticket.ResolutionDescription = resolutionDescription.String
	}
	return writeJSON(response, http.StatusOK, ticket)
}

func (server *APIServer) handleAllTickets(response http.ResponseWriter, request *http.Request) error {
	if request.Method != "GET" {
		http.Error(response, "Only GET method is allowed", http.StatusMethodNotAllowed)
		return nil
	}

	rows, err := db.Query(`SELECT 
							id, 
							description, 
							created_at, 
							modified_at, 
							customer_name, 
							customer_email, 
							status,
							employee_name,
							resolution_description
						FROM ticket`)
	if err != nil {
		log.Printf("[ERROR] failed to execute query: %v", err)
		http.Error(response, "Internal server error", http.StatusInternalServerError)
		return nil
	}
	defer rows.Close()

	var tickets []Ticket
	for rows.Next() {
		var (
			ticket                Ticket
			employeeName          sql.NullString
			resolutionDescription sql.NullString
		)
		err := rows.Scan(
			&ticket.ID,
			&ticket.Description,
			&ticket.DateCreated,
			&ticket.LastModified,
			&ticket.CustomerName,
			&ticket.CustomerEmail,
			&ticket.Status,
			&employeeName,
			&resolutionDescription,
		)
		if err != nil {
			log.Printf("[ERROR] failed to scan row: %v", err)
			continue
		}
		if employeeName.Valid {
			ticket.EmployeeName = employeeName.String
		}
		if resolutionDescription.Valid {
			ticket.ResolutionDescription = resolutionDescription.String
		}

		tickets = append(tickets, ticket)
	}

	if err := rows.Err(); err != nil {
		log.Printf("[ERROR] error iterating rows: %v", err)
		http.Error(response, "Internal server error", http.StatusInternalServerError)
		return nil
	}

	return writeJSON(response, http.StatusOK, tickets)
}
