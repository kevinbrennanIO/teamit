package main

import (
	"context"
	"errors"
	"github.com/okta/okta-sdk-golang/v2/okta"
	"os"
)

const (
	RequestTimeout = 30
	MaxRetries     = 3
)

// spawnOktaClient generates an Okta Client and returns it
func spawnOktaClient() (*okta.Client, error) {
	oktaToken := os.Getenv("OKTA_TOKEN")
	oktaDomain := os.Getenv("OKTA_DOMAIN")
	ctx := context.Background()
	ctx, client, err := okta.NewClient(
		ctx,
		okta.WithOrgUrl(oktaDomain),
		okta.WithToken(oktaToken),
		okta.WithRequestTimeout(RequestTimeout),
		okta.WithRateLimitMaxRetries(MaxRetries))
	if err != nil {
		return nil, errors.New("error spawning Okta client")
	}
	return client, nil
}
