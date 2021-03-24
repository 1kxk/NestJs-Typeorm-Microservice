#!/bin/bash
set -e

docker-compose -f docker-compose.prod.yml

# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
#     CREATE DATABASE test;
#     GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
# EOSQL
