.DEFAULT_GOAL := run

.PHONY: fmt vet build run clean
fmt:
	@go fmt ./...

vet: fmt
	@go vet ./...

build: vet
	@go build -o bin/tms-server

run: build
	@./bin/tms-server

test:
	@go test ./...

clean:
	@go clean
