module github.com/kevinbrennanio/teamit/sentiment

go 1.16

require (
	cloud.google.com/go/firestore v1.5.0
	github.com/golang/groupcache v0.0.0-20210331224755-41bb18bfe9da // indirect
	github.com/grassmudhorses/vader-go v0.0.0-20191126145716-003d5aacdb71
	github.com/kevinbrennanio/teamit/modules/firestore v0.0.0-00010101000000-000000000000
	github.com/kevinbrennanio/teamit/modules/logger v0.0.0-00010101000000-000000000000
	github.com/kevinbrennanio/teamit/modules/util v0.0.0-00010101000000-000000000000
	golang.org/x/mod v0.4.2 // indirect
	golang.org/x/net v0.0.0-20210410081132-afb366fc7cd1 // indirect
	golang.org/x/oauth2 v0.0.0-20210413134643-5e61552d6c78 // indirect
	golang.org/x/sys v0.0.0-20210412220455-f1c623a9e750 // indirect
	google.golang.org/api v0.44.0
	google.golang.org/genproto v0.0.0-20210413151531-c14fb6ef47c3 // indirect
	google.golang.org/grpc v1.37.0 // indirect
)

replace (
	github.com/kevinbrennanio/teamit/modules/firestore => ../modules/firestore
	github.com/kevinbrennanio/teamit/modules/logger => ../modules/logger
	github.com/kevinbrennanio/teamit/modules/util => ../modules/util
)
