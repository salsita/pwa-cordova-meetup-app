#!/bin/bash
set -e

echo "Starting the server in the background..."
cd server
npm start &

echo "Starting the web client..."
cd ../client
npm start
