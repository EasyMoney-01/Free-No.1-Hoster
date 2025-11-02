#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Initializing FreeHoster project...');

try {
  // Check if Node.js is installed
  execSync('node --version', { stdio: 'inherit' });
  console.log('✓ Node.js is installed');
  
  // Check if npm is installed
  execSync('npm --version', { stdio: 'inherit' });
  console.log('✓ npm is installed');
  
  // Install backend dependencies
  console.log('Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✓ Backend dependencies installed');
  
  // Check if client directory exists
  if (fs.existsSync(path.join(__dirname, 'client'))) {
    console.log('Installing frontend dependencies...');
    process.chdir(path.join(__dirname, 'client'));
    execSync('npm install', { stdio: 'inherit' });
    console.log('✓ Frontend dependencies installed');
  }
  
  console.log('\nFreeHoster project initialized successfully!');
  console.log('\nTo start the development servers:');
  console.log('1. Backend: npm run dev (in root directory)');
  console.log('2. Frontend: npm start (in client directory)');
  
} catch (error) {
  console.error('Error initializing project:', error.message);
  process.exit(1);
}