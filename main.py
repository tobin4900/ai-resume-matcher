import os
from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import fitz  # PyMuPDF
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for all origins (helpful for frontend testing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Function to extract text from uploaded PDF resume
def extract_text_from_pdf(file: UploadFile) -> str:
    with fitz.open(stream=file.file.read(), filetype="pdf") as doc:
        text = ""
        for page in doc:
            text += page.get_text()
        return text.strip()

# Function to get AI-based resume match score using Gemini
def get_match_score(resume_text: str, job_description: str) -> str:
    model = genai.GenerativeModel('gemini-1.5-flash')  # Use lighter model to avoid quota limits
    prompt = f"""
You are an AI resume evaluator. Compare the following resume to the job description and give a match score out of 100, and give brief feedback.

Resume:
{resume_text}

Job Description:
{job_description}

Respond in the following format:

Match Score: XX/100
Feedback: <Your feedback here>
"""
    response = model.generate_content(prompt)
    return response.text

# API endpoint to upload resume and job description
@app.post("/match_resume")
async def match_resume(resume: UploadFile, job_description: str = Form(...)):
    try:
        resume_text = extract_text_from_pdf(resume)
        result = get_match_score(resume_text, job_description)
        return JSONResponse(content={"result": result})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Basic root endpoint
@app.get("/")
def read_root():
    return {"message": "Resume Matcher API is running."}
