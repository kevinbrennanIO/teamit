package main

import (
	log "github.com/sirupsen/logrus"
	"os"
)

// createLogger returns an instance of a logger.
// This saves importing and configuring the log
// package multiple time throughout the project
func createLogger() *log.Logger {

	// logger := &log.Logger{
	//     Out:   os.Stderr,
	//     Level: logrus.DebugLevel,
	//     Formatter: &easy.Formatter{
	//         TimestampFormat: "2006-01-02 15:04:05",
	//         LogFormat:       "[%lvl%]: %time% - %msg%",
	//     },
	// }
	logger := log.New()
	logger.SetFormatter(&log.JSONFormatter{})
	logger.SetOutput(os.Stdout)

	return logger
}
