#!/bin/bash
#
# Jenkins build script
# Starts containers on the swarm, change $SCALE to the amount you want

SWARM="tcp://swarm.cloudkeeper.io:12375"
REGISTRY="registry.cloudkeeper.io"
NAME="adamkdean-co-uk"
FULLNAME="$REGISTRY/$NAME:latest"
SCALE=1

docker pull $FULLNAME
docker run -d -P --name $NAME_0 $FULLNAME

# echo "[notice] For now, we'll just take down the old containers and start the new ones"
# echo "[notice] Eventually we should make sure the new ones are up before killing the others"
# echo " ----------------------------------------------------------------"
#
# i="0"
# while [ $i -lt $SCALE ]; do
#
#     echo "[info] Pulling $REGISTRY/$NAME:latest..."
#     docker pull $REGISTRY/$NAME:latest
#
#     echo "[info] Killing & removing ${NAME}_${i}..."
#     docker -H $SWARM kill ${NAME}_${i}
#     docker -H $SWARM rm ${NAME}_${i}
#
#     echo "[info] Running ${NAME}_${i}..."
#     docker -H $SWARM run -d -P \
#         -e DEBUG_TIMESTAMP="$(date +'%T')" \
#         --name ${NAME}_${i} \
#         --restart=always \
#         $REGISTRY/$NAME:latest
#
#     echo " ----------------------------------------------------------------"
#
#     i=$[$i+1]
# done
