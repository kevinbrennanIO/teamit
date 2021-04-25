module github.com/kevinbrennanio/teamit/registration

go 1.16

require (
	cloud.google.com/go/firestore v1.5.0 // indirect
	github.com/kevinbrennanio/teamit/modules/firestore v0.0.0-00010101000000-000000000000
	github.com/kevinbrennanio/teamit/modules/logger v0.0.0-00010101000000-000000000000
	github.com/kevinbrennanio/teamit/modules/util v0.0.0-00010101000000-000000000000
	github.com/kr/text v0.2.0 // indirect
	github.com/okta/okta-sdk-golang/v2 v2.2.2
	google.golang.org/api v0.44.0 // indirect
	gopkg.in/check.v1 v1.0.0-20201130134442-10cb98267c6c // indirect
)

replace (
	github.com/kevinbrennanio/teamit/modules/firestore => ../modules/firestore
	github.com/kevinbrennanio/teamit/modules/logger => ../modules/logger
	github.com/kevinbrennanio/teamit/modules/util => ../modules/util
)
