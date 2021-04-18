package main

import (
	"context"
	fs "github.com/kevinbrennanio/teamit/modules/firestore"
	"log"
	"time"
)

type Post struct {
	Title        string    `firestore:"title,omitempty"`
	Body         string    `firestore:"body,omitempty"`
	Type         string    `firestore:"body,omitempty"`
	CreatedBy    string    `firestore:"createdBy,omitempty"`
	ResolvedBy   string    `firestore:"resolvedBy,omitempty"`
	CreatedTime  time.Time `firestore:"createdTime,omitempty"`
	ResolvedTime time.Time `firestore:"resolvedTime,omitempty"`
	Status       string    `firestore:"status,omitempty"`
	Tags         []string  `firestore:"tags,omitempty"`
	ThumbsUp     int       `firestore:"thumbsUp,omitempty"`
	ThumbsDown   int       `firestore:"thumbsDown,omitempty"`
}

func main() {

	client := fs.GetSeedClient()
	defer client.Close()
	ctx := context.Background()
	now := time.Now()

	posts := []Post{
		{
			Title: "SSH Connectivity Issue",
			Body: "Im having difficulty connecting to our dev server, can anyone help? We have a release " +
				"coming up later today and I need to run some last minute checks on the RC.",
			CreatedBy:    "kevin@brennan.com",
			ResolvedBy:   "harry@breannan.com",
			CreatedTime:  now.Add(time.Duration(-10) * time.Hour),
			ResolvedTime: now,
			Status:       "resolved",
			Tags:         []string{"linux", "ssh", "networking"},
			ThumbsUp:     3,
			ThumbsDown:   0,
			Type:         "query",
		},
		{
			Title: "Duplicate database records",
			Body: "I have noticed there seems to be a lot of duplicate entries in the database after the " +
				"migration test finish running. Has anyone come across this before?",
			CreatedBy:   "charlie@brennan.com",
			ResolvedBy:  "",
			CreatedTime: time.Now(),
			Status:      "open",
			Tags:        []string{"migration", "database", "testing"},
			ThumbsUp:    0,
			ThumbsDown:  0,
			Type:        "query",
		},
		{
			Title:       "Lunch plans",
			Body:        "I'm going to check out that new sandwich place on the corner for lunch if anyone is interested?",
			CreatedBy:   "kevin@brennan.com",
			CreatedTime: time.Now(),
			Tags:        []string{"lunch", "sandwich"},
			ThumbsUp:    0,
			ThumbsDown:  0,
			Type:        "blog",
		},
		{
			Title: "Active Directory Config",
			Body: "A new guy is starting in the sales dept. later this week. I am trying to configure his account, however, " +
				"each time I try to assign a licence I get the following error."
			CreatedBy:    "kevin@brennan.com",
			ResolvedBy:   "harry@breannan.com",
			CreatedTime:  now.Add(time.Duration(-10) * time.Hour),
			ResolvedTime: now,
			Status:       "resolved",
			Tags:         []string{"linux", "ssh", "networking"},
			ThumbsUp:     3,
			ThumbsDown:   0,
			Type:         "query",
		},
	}

	// seed the data
	for _, post := range posts {
		_, _, err := client.Collection("test").Add(ctx, post)
		if err != nil {
			// Handle any errors in an appropriate way, such as returning them.
			log.Printf("An error has occurred: %s", err)
		}
	}
}
