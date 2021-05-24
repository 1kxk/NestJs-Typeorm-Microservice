#!/bin/bash

npm config set cache /usr/app/.npm-cache --global

cd /usr/app

if [ ! -f ".env.test" ]; then
  cp .env.example .env.test
fi

npm install
npm run typeorm migration:run
top
#npm run start:dev
