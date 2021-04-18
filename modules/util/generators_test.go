package util

import "testing"

func TestGeneratePassword(t *testing.T) {

	got := GeneratePassword(20)
	want := len(got)

	if len(got) != want {
		t.Errorf("got %q want %q", got, want)
	}
}
