#!/bin/bash

cp .env.example .env.test
chmod +x ./.docker/entrypoint.sh
sudo docker-compose -f docker-compose.dev.yaml up -d --build
