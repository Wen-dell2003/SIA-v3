@echo off
echo Checking MongoDB installation...

REM Create data directory if it doesn't exist
mkdir "C:\data\db" 2>nul
echo Created data directory: C:\data\db

echo.
echo Please follow these steps to get MongoDB running:

echo 1. Download MongoDB Community Server from:
echo https://www.mongodb.com/try/download/community

echo.
echo 2. During installation:
echo - Choose "Complete" installation
echo - Install MongoDB as a Service
echo - Install MongoDB Compass (optional but recommended)

echo.
echo 3. After installation, start MongoDB:
echo Method A: If installed as a service
echo - Open Services (services.msc)
echo - Find "MongoDB" and ensure it's running
echo - If not running, right-click and select "Start"

echo.
echo Method B: Manual start
echo - Open Command Prompt as Administrator
echo - Navigate to MongoDB bin directory (usually C:\Program Files\MongoDB\Server\[version]\bin)
echo - Run: mongod.exe

echo.
echo 4. Test connection:
echo - MongoDB should be available at: mongodb://localhost:27017

echo.
echo If you need help, please let me know!
