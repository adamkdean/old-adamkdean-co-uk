#!/bin/bash
#
# Jenkins build script

DISCOVERY="consul://swarm.cloudkeeper.io:8500/swarm"
SWARM="tcp://swarm.cloudkeeper.io:12375"
REGISTRY="registry.cloudkeeper.io"
NAME="adamkdean-co-uk"
SCALE=1

# Step 1. Build
docker build -t "build_$NAME" .
docker tag -f "build_$NAME:latest" "$REGISTRY/$NAME:latest"
docker rmi "build_$NAME"
docker push "$REGISTRY/$NAME:latest"

# Step 2. Get all Swarm nodes to pull new image
HOSTS=$(docker run --rm swarm list $DISCOVERY)
for host in $HOSTS do
    docker -H $h pull "$REGISTRY/$NAME:latest"
done

# Step 3. Run the containers
echo "[notice] For now, we'll just take down the old containers and start the new ones"
echo "[notice] Eventually we should make sure the new ones are up before killing the others"
echo " ----------------------------------------------------------------"

i="0"
while [ $i -lt $SCALE ]; do

    echo "[info] Killing & removing ${NAME}_${i}..."
    docker -H $SWARM kill ${NAME}_${i}
    docker -H $SWARM rm ${NAME}_${i}

    echo "[info] Running ${NAME}_${i}..."
    docker -H $SWARM run -d -P \
        -e DEBUG_TIMESTAMP="$(date +'%T')" \
        --name ${NAME}_${i} \
        --restart=always \
        $REGISTRY/$NAME:latest

    echo " ----------------------------------------------------------------"

    i=$[$i+1]
done
