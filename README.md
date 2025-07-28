
AI Resume Matcher
This project is an AI-powered resume shortlisting tool that evaluates how well a resume matches a given job description. It calculates a match score and provides feedback on skills and improvements needed for better ATS compatibility.

Features
Upload a PDF resume and input a job description

AI model (Gemini API) analyzes the resume against the job description

Generates a match score (0–100) and brief feedback

Extracts text from PDF resumes using PyMuPDF

Built with FastAPI for backend and React for frontend

Handles cross-origin requests with CORS middleware

Tech Stack
Backend: FastAPI, PyMuPDF, Google Generative AI (Gemini API)

Frontend: React, Vite

Other: dotenv for environment variables

Project Structure
bash
Copy
Edit
ai-resume-matcher/
│── backend/
│   ├── main.py           # FastAPI server
│   ├── .env              # API keys and environment variables
│── frontend/
│   ├── src/              # React code
│   ├── package.json
Installation & Setup
1. Backend (FastAPI)
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/ai-resume-matcher.git
Navigate to backend:

bash
Copy
Edit
cd ai-resume-matcher/backend
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Create a .env file and add your Gemini API key:

ini
Copy
Edit
GEMINI_API_KEY=your_api_key_here
Start the FastAPI server:

bash
Copy
Edit
uvicorn main:app --reload
API runs at:

arduino
Copy
Edit
http://localhost:8000
2. Frontend (React)
Navigate to frontend:

bash
Copy
Edit
cd ai-resume-matcher/frontend
Install dependencies:

bash
Copy
Edit
npm install
Start development server:

bash
Copy
Edit
npm run dev
App runs at:

arduino
Copy
Edit
http://localhost:5173
API Documentation
POST /match_resume
Upload a PDF resume and provide a job description.

Form Data:

resume (file)

job_description (string)

Response:

json
Copy
Edit
{
  "result": "Match Score: 85/100\nFeedback: Resume is strong but add Python experience."
}
GET /
Health check endpoint:

json
Copy
Edit
{ "message": "Resume Matcher API is running." }
Notes
Make sure you have a valid Gemini API key.

The backend must be running for the frontend to work properly.
