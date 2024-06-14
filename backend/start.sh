#!/bin/bash

# Start Postgres container
docker run -d \
  --name my-postgres-db \
  -e POSTGRES_DB=userDb \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=supersecretpassword \
  -p 5432:5432 \
  postgres

sleep 10

node db/scripts/createTable.js

npm start