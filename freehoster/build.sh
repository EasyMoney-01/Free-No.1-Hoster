#!/bin/bash

# Build script for FreeHoster platform

echo "Building FreeHoster platform..."

# Build backend
echo "Installing backend dependencies..."
npm install

# Build frontend
echo "Installing frontend dependencies..."
cd client
npm install

echo "Building frontend..."
npm run build

echo "Build completed successfully!"