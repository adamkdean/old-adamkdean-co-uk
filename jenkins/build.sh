#!/bin/bash
#
# Jenkins build script
# Builds the docker image and pushes to registry

REGISTRY="registry.cloudkeeper.io"
NAME="adamkdean-co-uk"

docker build -t "$REGISTRY/$NAME" .
docker push "$REGISTRY/$NAME:latest"
