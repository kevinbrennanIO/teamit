package main

import (
	"context"
	"fmt"
	fs "github.com/kevinbrennanio/teamit/modules/firestore"
	lg "github.com/kevinbrennanio/teamit/modules/logger"
	utilities "github.com/kevinbrennanio/teamit/modules/util"
	"net/http"
)

// requestHandler routes the HTTP request to the appropriate method
// depending on the specified HTTP verb ( GET, POST, PUT, DELETE)
func requestHandler(res http.ResponseWriter, req *http.Request) {

	// Configure CORS setting
	utilities.ConfigureCors(&res)

	// configure logging
	logger := lg.CreateLogger()
	ctx := context.Background()

	// instantiate Okta Client
	oktaClient, err := spawnOktaClient()
	if err != nil {
		logger.Error(err)
	}

	// dependency inject firestore client
	fsc := fs.GetClient()

	// extract query parameters
	query := req.URL.Query()

	// logic is based on HTTP request verb
	switch req.Method {
	case "GET":
		if query["email"] != nil {
			checkUserExist(ctx, oktaClient, res, query["email"][0])
		}
		if query["team"] != nil {
			checkTeamExists(ctx, fsc, res, req)
		}
		//checkUserExist(ctx, oktaClient, res, req)
	case "POST":
		createUser(ctx, oktaClient, res, req)
	case "PUT":
		updateUser(ctx, oktaClient, res, req)
	case "DELETE":
		removeUser(ctx, oktaClient, res, req)
	case "OPTIONS":
		return
	default:
		res.WriteHeader(http.StatusNotFound)
		fmt.Fprint(res, "Unknown API endpoint")
		err := fmt.Errorf("method %s for %s not supported", req.Method, req.URL)
		logger.Infof("registration API error: %v", err.Error())
	}
}
