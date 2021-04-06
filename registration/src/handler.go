package main

import (
	"context"
	"fmt"
	"net/http"
)

// requestHandler routes the HTTP request to the appropriate method
// depending on the specified HTTP verb ( GET, POST, PUT, DELETE)
func requestHandler(res http.ResponseWriter, req *http.Request) {

	// configure logging
	logger := createLogger()
	ctx := context.Background()

	// instantiate Okta Client
	oktaClient, err := spawnOktaClient()
	if err != nil {
		logger.Error(err)
	}

	// logic is based on HTTP request verb
	switch req.Method {
	case "GET":
		checkUserExist(ctx, oktaClient, res, req)
	case "POST":
		createUser(ctx, oktaClient, res, req)
	case "PUT":
		updateUser(ctx, oktaClient, res, req)
	case "DELETE":
		removeUser(ctx, oktaClient, res, req)
	default:
		res.WriteHeader(http.StatusNotFound)
		fmt.Fprint(res, "Unknown API endpoint")
		err := fmt.Errorf("method %s for %s not supported", req.Method, req.URL)
		logger.Infof("registration API error: %v", err.Error())
	}
}
