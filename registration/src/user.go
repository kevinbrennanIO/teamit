package main

import (
	"context"
	"errors"
	"fmt"
	"github.com/okta/okta-sdk-golang/v2/okta"
	"strings"
)

// UserRequest struct defines a user request
type User struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

// configure logging
var logger = createLogger()

// validateParams validates a user request
func (ur *User) validateParams() error {

	if ur.FirstName == "" {
		return errors.New("firstname is a required field")
	}
	if ur.LastName == "" {
		return errors.New("lastname is a required field")
	}
	if ur.Email == "" {
		return errors.New("valid email address is a required field")
	}
	if ur.Password == "" {
		return errors.New("password is a required field")
	}
	return nil
}

// checkUserExists checks if the provided user is known to the system
func (ur *User) checkUserExists(ctx context.Context, oktaClient *okta.Client) (error, *okta.Response) {
	user, resp, err := oktaClient.User.GetUser(ctx, ur.Email)
	if err != nil {
		if resp.StatusCode != 404 {
			logger.Errorf("error checking if user exists: %v", err)
			return err, nil
		}
	}
	if resp.StatusCode == 404 {
		return nil, resp
	}
	if strings.Contains("ACTIVE", user.Status) && resp.StatusCode == 200 {
		return errors.New(fmt.Sprintf("%v is unavailable", ur.Email)), resp
	}
	return errors.New("unknown error"), resp
}

// createUser creates a new user
func (ur *User) createUser(ctx context.Context, oktaClient *okta.Client) (error, *okta.Response) {

	p := &okta.PasswordCredential{
		Value: ur.Password,
	}
	uc := &okta.UserCredentials{
		Password: p,
	}
	profile := okta.UserProfile{}
	profile["firstName"] = ur.FirstName
	profile["lastName"] = ur.LastName
	profile["email"] = ur.Email
	profile["login"] = ur.Email
	userReq := &okta.CreateUserRequest{
		Credentials: uc,
		Profile:     &profile,
	}

	// request to create new user
	_, resp, err := oktaClient.User.CreateUser(ctx, *userReq, nil)
	if err != nil {
		logger.Errorf("error creating user: %v", err)
		return err, resp
	}
	return nil, resp
}

// updateUser updates an existing user
func (ur *User) updateUser(ctx context.Context, oktaClient *okta.Client) (error, *okta.Response) {
	return nil, nil
}

// removeUser removes an existing user
func (ur *User) removeUser(ctx context.Context, oktaClient *okta.Client) (error, *okta.Response) {

	// user deactivation is required before removal
	resp, err := oktaClient.User.DeactivateUser(ctx, ur.Email, nil)
	if err != nil {
		logger.Errorf("user deactivation error: %v", err)
		return err, resp
	}
	_, err = oktaClient.User.DeactivateOrDeleteUser(ctx, ur.Email, nil)
	if err != nil {
		logger.Errorf("user deletion error: %v", err)
		return err, resp
	}
	return nil, resp
}
