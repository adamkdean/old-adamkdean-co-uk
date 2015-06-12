#!/bin/bash
#
# Jenkins build script



DISCOVERY="consul://swarm.cloudkeeper.io:8500/swarm"
SWARM="tcp://swarm.cloudkeeper.io:12375"
REGISTRY="registry.cloudkeeper.io"
NAME="adamkdean-co-uk"
SCALE=1

# Step 1. Build
echo "[info] Building & pushing new image..."
docker build -t "build_$NAME" .
docker tag -f "build_$NAME:latest" "$REGISTRY/$NAME:latest"
docker rmi "build_$NAME"
docker push "$REGISTRY/$NAME:latest"

# Step 2. Get all Swarm nodes to pull new image
echo "[info] Co-ordinating image update on Swarm nodes..."
HOSTS=$(docker run --rm swarm list $DISCOVERY)
for host in $HOSTS; do
    echo "[info] Updating $REGISTRY/$NAME:latest on $host..."
    docker -H $host pull "$REGISTRY/$NAME:latest"
done

# Step 3. Run the containers
echo "[notice] For now, we'll just take down the old containers and start the new ones"
echo "[notice] Eventually we should make sure the new ones are up before killing the others"

i="0"
while [ $i -lt $SCALE ]; do

    echo "[info] Killing & removing ${NAME}_${i}..."
    docker -H $SWARM kill ${NAME}_${i}
    docker -H $SWARM rm ${NAME}_${i}

    echo "[info] Running ${NAME}_${i}..."
    docker -H $SWARM run -d -P \
        --name ${NAME}_${i} \
        --restart=always \
        $REGISTRY/$NAME:latest

    i=$[$i+1]
done

echo "Done!"
