#!/usr/bin/env bash

NAME="api"
[[ "$VERSION" == "" ]] && VERSION="dev"

SCRIPTPATH="$( cd "$(dirname "$BASH_SOURCE")" ; pwd -P )"
ROOTPATH=$(dirname ${SCRIPTPATH})

mkdir -p ${ROOTPATH}/.cache/pkg

docker run --rm \
  -u $(id -u):$(id -g) \
  -v ${ROOTPATH}/.cache/pkg:/go/pkg \
  -v ${ROOTPATH}/.cache/cache:/.cache \
  -v ${ROOTPATH}:${ROOTPATH} \
  -w ${SCRIPTPATH}/cmd/api \
  -e GOOS=linux -e GOARCH=amd64 -e CGO_ENABLED=0 \
  golang:1.13.2 \
  bash -ce "go build"