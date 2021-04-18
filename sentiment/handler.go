package main

import (
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

	// dependency inject firestore client
	fsc := fs.GetClient()

	var user string

	// extract query parameters
	query := req.URL.Query()
	paramCount := len(req.URL.Query())

	team := query["team"][0]
	if paramCount > 1 {
		user = query["user"][0]
	}

	// switch logic via HTTP request verb
	switch req.Method {
	case "GET":
		if paramCount == 1 {
			TeamSentiment(team, fsc)
		} else {
			IndividualSentiment(team, user, fsc)
		}
	case "OPTIONS":
		return
	default:
		res.WriteHeader(http.StatusNotFound)
		fmt.Fprint(res, "Unknown API endpoint")
		err := fmt.Errorf("method %s for %s not supported", req.Method, req.URL)
		logger.Infof("sentiment API error: %v", err.Error())
	}
}
