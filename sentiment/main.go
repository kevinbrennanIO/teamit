package main

import (
	"fmt"
	lg "github.com/kevinbrennanio/teamit/modules/logger"
	"net/http"
)

const Version = "v1" // Version api version
const Port = ":2411" // Port HTTP server port

// main entrypoint
func main() {

	// configure logging
	logger := lg.CreateLogger()
	logger.Infof("starting sentiment server on port %s", Port)

	// initialize and launch HTTP server
	http.HandleFunc(fmt.Sprintf("/api/%v/sentiment", Version), requestHandler)
	logger.Fatal(http.ListenAndServe(Port, nil))
}
