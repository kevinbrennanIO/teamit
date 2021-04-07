package main

import (
	"fmt"
	"net/http"
)

// api version
const Version = "v1"

// main entrypoint
func main() {
	// configure logging
	logger := createLogger()
	logger.Info("Starting HTTP Server...")

	// initialize and launch HTTP server
	http.HandleFunc(fmt.Sprintf("/api/%v/user", Version), requestHandler)
	logger.Fatal(http.ListenAndServe(":2410", nil))
}
