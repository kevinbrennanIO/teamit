package main

import "testing"

func TestGeneratePassword(t *testing.T) {

	got := generatePassword(20)
	want := len(got)

	if len(got) != want {
		t.Errorf("got %q want %q", got, want)
	}
}
