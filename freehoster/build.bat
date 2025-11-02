@echo off
REM Build script for FreeHoster platform on Windows

echo Building FreeHoster platform...

REM Build backend
echo Installing backend dependencies...
npm install

REM Build frontend
echo Installing frontend dependencies...
cd client
npm install

echo Building frontend...
npm run build

echo Build completed successfully!

cd ..