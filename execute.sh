#!/bin/bash
# set -e
sudo docker-compose up -d --build

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
#     CREATE DATABASE test;
#     GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
# EOSQL
