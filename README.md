# AI Resume Matcher

This project is an AI-powered resume shortlisting tool that evaluates how well a resume matches a given job description. It calculates a match score and provides feedback on skills and improvements needed for better ATS compatibility.

## Features
- **Upload Resume**: Support for PDF resume uploads.
- **Job Description**: Analyze resumes against specific job descriptions.
- **AI Analysis**: Uses Google Gemini API to generate a match score (0–100) and detailed feedback.
- **Text Extraction**: Uses PyMuPDF to extract text from PDFs.
- **Modern UI**: Built with React and Vite for a fast, responsive user interface.

## Tech Stack
- **Backend**: FastAPI, PyMuPDF, Google Generative AI (Gemini API)
- **Frontend**: React, Vite
- **Deployment**: Render (Backend), Vercel (Frontend)

## Project Structure
```
ai-resume-matcher/
│── backend/
│   ├── main.py           # FastAPI server
│   ├── requirements.txt  # Python dependencies
│   ├── .env              # API keys (not committed)
│── frontend/
│   ├── src/              # React source code
│   ├── package.json      # Node dependencies
│── README.md
```

## Local Development Setup

### 1. Backend (FastAPI)
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Create a `.env` file in the `backend` folder and add your API key:
    ```ini
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
5.  Start the server:
    ```bash
    uvicorn main:app --reload
    ```
    The API will run at `http://127.0.0.1:8000`.

### 2. Frontend (React)
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

## Deployment Guide

### Backend (Render)
1.  Create a **Web Service** on [Render](https://render.com).
2.  Connect your repository.
3.  **Root Directory**: `backend`
4.  **Build Command**: `pip install -r requirements.txt`
5.  **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
6.  **Environment Variables**: Add `GEMINI_API_KEY`.
7.  Deploy and copy the backend URL (e.g., `https://your-app.onrender.com`).

### Frontend (Vercel)
1.  Create a **New Project** on [Vercel](https://vercel.com).
2.  Import your repository.
3.  **Root Directory**: `frontend`
4.  **Environment Variables**: Add `VITE_API_URL` with your Render Backend URL (no trailing slash).
5.  Deploy.

## API Documentation
- **POST /match_resume**: Upload a PDF resume and job description to get a match score and feedback.
- **GET /**: Health check endpoint.
