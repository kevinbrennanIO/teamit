module github.com/kevinbrennanio/teamit/registration

go 1.16

require (
	github.com/cucumber/godog v0.11.0 // indirect
	github.com/okta/okta-sdk-golang/v2 v2.2.2
)

replace (
	github.com/kevinbrennanio/teamit/registration => ../modules/logger
)
