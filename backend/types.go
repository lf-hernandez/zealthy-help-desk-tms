package main

import "time"

type Ticket struct {
	ID                    string    `json:"id"`
	Description           string    `json:"description"`
	DateCreated           time.Time `json:"date_created"`
	LastModified          time.Time `json:"last_modified"`
	CustomerName          string    `json:"customer_name"`
	CustomerEmail         string    `json:"customer_email"`
	Status                string    `json:"status"`
	EmployeeName          string    `json:"employee_name"`
	ResolutionDescription string    `json:"resolution_description"`
}
