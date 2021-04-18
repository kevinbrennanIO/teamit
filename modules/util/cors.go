package util

import "net/http"

// ConfigureCors - values currently set are only suitable for Development
func ConfigureCors(res *http.ResponseWriter) {

	(*res).Header().Set("Access-Control-Allow-Origin", "*")
	(*res).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*res).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, username-from-header")
}
