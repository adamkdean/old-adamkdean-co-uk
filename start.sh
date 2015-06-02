#!/bin/bash
#
# Builds, configures, and starts my damn site

DOCKER_HOST=tcp://swarm.cloudkeeper.io:12375
PRIVATE_IPV4=$(ifconfig eth1 | grep "inet addr" | awk -F: '{print $2}' | awk '{print $1}')
ARRAY=(1 2 3)
NAME=adamkdean-co-uk

# build it if we don't already have it
if [ $(docker images | grep ${NAME} | wc -l) -eq 0 ]; then
    docker build -t $NAME .
fi

# swarm before
docker -H $DOCKER_HOST info

for i in "${ARRAY[@]}"
do
    echo "Running ${NAME}_${i}"
    docker -H $DOCKER_HOST run -d \
        -p $PRIVATE_IPV4:0:8000 \
        --name ${NAME}_${i} \
        --restart=always \
        $NAME
done

# swarm after
docker -H $DOCKER_HOST info
docker ps | grep $NAME
