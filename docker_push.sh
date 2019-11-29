#!/bin/bash

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
docker build -t gymmanager .
docker tag gymmanager i4vk/gymmanager
docker push i4vk/gymmanager