#!/bin/bash

npm config set cache /home/node/app/.npm-cache --global

cd /usr/app

if [ ! -f ".env.dev" ]; then
  cp .env.example .env.test
fi

npm install
npm run typeorm migration:run
npm run start:dev

