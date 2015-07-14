#!/bin/bash

BRANCH=$(echo $GIT_BRANCH | cut -d "/" -f 2)
IMAGE="$JOB_NAME-$BRANCH"

docker build -t $IMAGE .

OUT=$?
if [ $OUT -eq 0 ]; then
    docker kill $IMAGE 2>/dev/null || true
    docker rm -f $IMAGE 2>/dev/null || true
    docker run -d \
        --restart=always \
        --name $IMAGE \
        -p $HTTP_PORT:80 \
        $IMAGE
else
    exit $OUT
fi
