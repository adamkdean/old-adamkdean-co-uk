#!/bin/bash
#
# Jenkins build script
# Builds the docker image and pushes to registry

REGISTRY="registry.cloudkeeper.io"
NAME="adamkdean-co-uk"

docker build -t $NAME .
docker tag "$NAME:latest" "$REGISTRY/$NAME:latest"
docker rmi $NAME
docker push "$REGISTRY/$NAME:latest"
