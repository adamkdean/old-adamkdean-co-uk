#!/bin/bash
#
# Jenkins build script

DISCOVERY="consul://swarm.cloudkeeper.io:8500/swarm"
SWARM="tcp://swarm.cloudkeeper.io:12375"
REGISTRY="registry.cloudkeeper.io"
PROJECT="adamkdean-co-uk"
BRANCH=$(echo $GIT_BRANCH | cut -d "/" -f 2)
IMAGE="$PROJECT-$BRANCH"
SCALE=1

# Step 1. Build
echo "[info] Building & pushing new image..."
docker build -t "build_$IMAGE" .
docker tag -f "build_$IMAGE:latest" "$REGISTRY/$IMAGE:latest"
docker rmi "build_$IMAGE"
docker push "$REGISTRY/$IMAGE:latest"

# Step 2. Get all Swarm nodes to pull new image
echo "[info] Co-ordinating image update on Swarm nodes..."
HOSTS=$(docker run --rm swarm list $DISCOVERY)
for host in $HOSTS; do
    echo "[info] Updating $REGISTRY/$IMAGE:latest on $host..."
    docker -H $host pull "$REGISTRY/$IMAGE:latest"
done

# Step 3. Run the containers
echo "[notice] For now, we'll just take down the old containers and start the new ones"
echo "[notice] Eventually we should make sure the new ones are up before killing the others"

i="0"
while [ $i -lt $SCALE ]; do

    echo "[info] Killing & removing ${IMAGE}_${i}..."
    docker -H $SWARM kill ${IMAGE}_${i}
    docker -H $SWARM rm ${IMAGE}_${i}

    echo "[info] Running ${IMAGE}_${i}..."
    docker -H $SWARM run -d -P \
        --name ${IMAGE}_${i} \
        --restart=always \
        $REGISTRY/$IMAGE:latest

    i=$[$i+1]
done

echo "Done!"
