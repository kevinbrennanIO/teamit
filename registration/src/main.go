package main

import (
	"net/http"
)

// main entrypoint
func main() {
	// configure logging
	logger := createLogger()
	logger.Info("Starting HTTP Server...")

	// initialize and launch HTTP server
	http.HandleFunc("/user", requestHandler)
	logger.Fatal(http.ListenAndServe(":2410", nil))
}
