#!/bin/bash

PROJECT_NAME=compelling-pen-232213
DOCKER_IMAGE_NAME=booking-poc
ZONE_EN1B=europe-north1-b

echo "docker build"
docker build -t gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:0.5 .

echo "docker push"
gcloud docker -- push gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:0.5


echo "Create instance"
gcloud beta compute instances create-with-container instance-1 \
   --zone $ZONE_EN1B \
   --container-image=gcr.io/$PROJECT_NAME/$DOCKER_IMAGE_NAME:0.5 \
   --machine-type=g1-small



echo "Create firewall-rules"
gcloud compute firewall-rules create port-forwarding-9090 \
   --action allow \
   --rules tcp:9090 \
   --source-ranges=0.0.0.0/0 \
   --priority 1000
