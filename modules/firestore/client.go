package firestore

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"google.golang.org/api/option"
)

// GetClient returns a firestore client to the caller
//TODO: check if defer client closed needs to be called

func GetClient() *firestore.Client {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, "teamit-app", option.WithCredentialsFile("../modules/firestore/cred.json"))
	if err != nil {
		fmt.Errorf("Firestore client creation error: %v", err)
	}
	return client
}

func GetSeedClient() *firestore.Client {
	ctx := context.Background()
	client, err := firestore.NewClient(ctx, "teamit-app", option.WithCredentialsFile("../firestore/cred.json"))
	if err != nil {
		fmt.Errorf("firestore client creation error: %v", err)
	}
	return client
}
