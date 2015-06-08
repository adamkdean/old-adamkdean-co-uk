#!/bin/bash
#
# Jenkins build script
# Builds the docker image and pushes to registry

REGISTRY="registry.cloudkeeper.io"
NAME="adamkdean-co-uk"

echo "PWD $(pwd)"
echo "ls -al posts/:"
ls -al posts/

docker build -t "$REGISTRY/$NAME" .
docker push "$REGISTRY/$NAME:latest"
