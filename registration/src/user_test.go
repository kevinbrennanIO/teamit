package main

import (
	"testing"
)

func TestValidateParams(t *testing.T) {
	testUser := User{
		FirstName: "test",
		LastName:  "user",
		Email:     "tes@user.com",
		Password:  "password",
	}
	err := testUser.validateParams()
	if err != nil {
		t.Error(err)
	}
}

