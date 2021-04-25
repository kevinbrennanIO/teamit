package main

import (
	"fmt"
	lg "github.com/kevinbrennanio/teamit/modules/logger"
	"net/http"
)

const Version = "v1"
const Port = ":2410"

// main entrypoint
func main() {
	// configure logging
	logger := lg.CreateLogger()
	logger.Info("starting registration server...")

	// initialize and launch HTTP server
	http.HandleFunc(fmt.Sprintf("/api/%v/user", Version), requestHandler)
	logger.Fatal(http.ListenAndServe(Port, nil))
}
