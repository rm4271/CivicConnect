@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

echo ==============================================
echo 🚀 Starting FastAPI + CivicConnect Server
echo ==============================================

cd backend

REM Activate venv
call venv\Scripts\activate

REM Start Uvicorn
uvicorn main:app --host 0.0.0.0 --port 8000
