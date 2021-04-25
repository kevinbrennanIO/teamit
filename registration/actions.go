package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	lg "github.com/kevinbrennanio/teamit/modules/logger"
	"github.com/okta/okta-sdk-golang/v2/okta"
	"net/http"
)

func checkUserExist(ctx context.Context, oktaClient *okta.Client, res http.ResponseWriter, email string) error {

	// configure logging
	logger := lg.CreateLogger()

	validateRequest := &User{}
	validateRequest.FirstName = "dummy"
	validateRequest.LastName = "dummy"
	validateRequest.Email = email
	validateRequest.Password = "dummy"


	// validate user request
	if err := validateRequest.validateParams(); err != nil {
		logger.Error(err)
		fmt.Fprint(res, err)
		res.WriteHeader(http.StatusBadRequest)
		return err
	}

	// check if user already exists
	err, _ := validateRequest.checkUserExists(ctx, oktaClient)
	if err != nil {
		logger.Errorf("Error while fetching user from Okta: %v", err)
		res.WriteHeader(http.StatusConflict)
		fmt.Fprint(res, err)
		return err
	}

	res.WriteHeader(http.StatusOK)
	fmt.Fprint(res, fmt.Sprintf("%v is available for selection.", validateRequest.Email))
	return nil
}

// checkTeamExists calls firestore to determine if the specified
// team already exists within the system.
func checkTeamExists(ctx context.Context, fsc *firestore.Client, res http.ResponseWriter, req *http.Request) {
	teamName := req.URL.Query()["team"][0]
	teams := fsc.Collection("teams")
	q := teams.Where("name", "==", teamName)
	iter := q.Documents(ctx)
	result, _ := iter.GetAll()
	if len(result) == 0 {
		res.WriteHeader(http.StatusOK)
	} else {
		res.WriteHeader(http.StatusConflict)
	}
}

func createUser(ctx context.Context, oktaClient *okta.Client, res http.ResponseWriter, req *http.Request) error {

	// read the request body
	decoder := json.NewDecoder(req.Body)
	createRequest := &User{}
	err := decoder.Decode(createRequest)
	if err != nil {
		logger.Errorf("decoding payload error: %v", err)
		return err
	}

	// validate user request
	if err := createRequest.validateParams(); err != nil {
		logger.Error(err)
		res.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(res, err)
		return err
	}

	// create user
	err, _ = createRequest.createUser(ctx, oktaClient)
	if err != nil {
		logger.Error(err)
		res.WriteHeader(http.StatusInternalServerError)
		fmt.Fprint(res, err)
		return err
	}
	res.WriteHeader(http.StatusOK)
	fmt.Fprint(res, fmt.Sprintf("account created for: %v", createRequest.Email))
	return nil
}

func updateUser(_ context.Context, _ *okta.Client, res http.ResponseWriter, _ *http.Request) error {
	// TODO: lower priority method, implement later date
	res.WriteHeader(http.StatusNotImplemented)
	fmt.Fprint(res, "unimplemented method call")
	return errors.New("unimplemented method call")
}

func removeUser(ctx context.Context, oktaClient *okta.Client, res http.ResponseWriter, req *http.Request) error {

	// read the request body
	decoder := json.NewDecoder(req.Body)
	removeRequest := &User{}
	err := decoder.Decode(removeRequest)
	if err != nil {
		logger.Errorf("decoding payload error: %v", err)
		return err
	}

	// validate user request
	if err := removeRequest.validateParams(); err != nil {
		logger.Error(err)
		res.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(res, err)
		return err
	}

	// remove user
	err, resp := removeRequest.removeUser(ctx, oktaClient)
	if err != nil {
		logger.Error(err)
		res.WriteHeader(resp.StatusCode)
		fmt.Fprint(res, err)
		return err
	}
	res.WriteHeader(http.StatusOK)
	fmt.Fprint(res, fmt.Sprintf("%v removed from okta", removeRequest.Email))
	return nil
}
