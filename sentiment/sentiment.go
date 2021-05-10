package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"fmt"
	"github.com/grassmudhorses/vader-go/lexicon"
	"github.com/grassmudhorses/vader-go/sentitext"
	lg "github.com/kevinbrennanio/teamit/modules/logger"
	"google.golang.org/api/iterator"
)

// TeamSentiment takes a team name as input, returning
// an overall sentiment score for the teams interactions
func TeamSentiment(team string, fsc *firestore.Client) (sentimentScore float64) {

	// TODO: extend to accept a timeframe for sentiment analysis

	// config/variables
	var interactions []string
	var totalSentiment float64 = 0
	ctx := context.Background()
	logger := lg.CreateLogger()

	// defer closing client and handle error
	defer func(fsc *firestore.Client) {
		err := fsc.Close()
		if err != nil {
			logger.Errorf("Error cleaning up Firestore client")
		}
	}(fsc)

	// team collection path
	collection := fmt.Sprintf("teams/%s/posts", team)

	// fetch posts and all comments
	iter := fsc.Collection(collection).Documents(ctx)
	defer iter.Stop()
	for {
		post, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			logger.Errorf("Reading collection error: %v", err)
		}

		// save posts to interactions array
		tmp := post.Data()["body"].(string)
		interactions = append(interactions, tmp)

		// get post comments
		docID := post.Ref.ID
		path := fmt.Sprintf("teams/%v/posts/%v/comments", team, docID)
		iter2 := fsc.Collection(path).Documents(ctx)
		comments, _ := iter2.GetAll()
		for _, eachReply := range comments {
			tmp2 := eachReply.Data()["body"].(string)
			interactions = append(interactions, tmp2)
		}
	}
	// compute sentiment score
	for _, eachInteraction := range interactions {
		parsedText := sentitext.Parse(eachInteraction, lexicon.DefaultLexicon)
		sentiment := sentitext.PolarityScore(parsedText)

		// calculate average sentiment
		totalSentiment = totalSentiment + sentiment.Compound
	}
	sentimentScore = totalSentiment / float64(len(interactions))
	logger.Infof("Team %v scored %v during sentiment analysis", team, sentimentScore)
	return sentimentScore
}

// IndividualSentiment takes a team name and user email
// as input, returning an overall sentiment score for
// the specified user.
func IndividualSentiment(team string, userEmail string, fsc *firestore.Client) (sentimentScore float64) {

	fmt.Println(team)
	fmt.Println(userEmail)

	// TODO: extend to accept a timeframe for sentiment analysis

	// config/variables
	var interactions []string
	var totalSentiment float64 = 0
	ctx := context.Background()
	logger := lg.CreateLogger()

	defer func(fsc *firestore.Client) {
		err := fsc.Close()
		if err != nil {
			logger.Errorf("Error cleaning up Firestore client")
		}
	}(fsc)

	// team collection path
	collection := fmt.Sprintf("teams/%s/posts", team)

	// define search user query
	postQuery := fsc.Collection(collection).Where("createdBy", "==", userEmail)

	postIter := postQuery.Documents(ctx)
	defer postIter.Stop()
	for {
		post, err := postIter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			logger.Errorf("User: Reading collection error: %v", err)
		}
		// save posts to interactions array
		tmpBody := post.Data()["body"].(string)
		interactions = append(interactions, tmpBody)

		// get post comments
		docID := post.Ref.ID
		path := fmt.Sprintf("teams/%v/posts/%v/comments", team, docID)
		iter2 := fsc.Collection(path).Documents(ctx)
		comments, _ := iter2.GetAll()
		for _, eachReply := range comments {
			tmp2 := eachReply.Data()["body"].(string)
			interactions = append(interactions, tmp2)
		}
	}

	// compute sentiment score
	for _, eachInteraction := range interactions {
		parsedText := sentitext.Parse(eachInteraction, lexicon.DefaultLexicon)
		sentiment := sentitext.PolarityScore(parsedText)

		// calculate average sentiment
		totalSentiment = totalSentiment + sentiment.Compound
	}
	sentimentScore = totalSentiment / float64(len(interactions))
	logger.Infof("User %v scored %v during sentiment analysis", userEmail, sentimentScore)
	return sentimentScore
}
