from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone
from pymongo import MongoClient
import uuid
import os
import resend

# -----------------------------
# Setup API
# -----------------------------
app = FastAPI()

# -----------------------------
# Resend Email Setup
# -----------------------------
resend.api_key = os.getenv("RESEND_API_KEY")

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://revivo.co.in",
        "https://www.revivo.co.in",
        "https://revivo-final.vercel.app"
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# MongoDB Setup
# -----------------------------
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set")

client = MongoClient(MONGO_URI)
db = client["revivo_db"]
contact_collection = db["contact_requests"]

api = APIRouter(prefix="/api")

# -----------------------------
# Form Schema
# -----------------------------
class ContactFormRequest(BaseModel):
    name: str
    phone: str
    email: EmailStr
    buildingName: str
    numberOfFlats: int
    location: str
    preferredDate: Optional[str] = ""

# -----------------------------
# API Health Check
# -----------------------------
@api.get("/")
def api_root():
    return {"message": "API is running ✅"}

# -----------------------------
# Contact Form Submission
# -----------------------------
@api.post("/contact")
def submit_contact_form(data: ContactFormRequest):
    try:

        doc = {
            "id": str(uuid.uuid4()),
            "name": data.name,
            "phone": data.phone,
            "email": data.email,
            "buildingName": data.buildingName,
            "numberOfFlats": data.numberOfFlats,
            "location": data.location,
            "preferredDate": data.preferredDate or "",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "new",
        }

        # Save to MongoDB
        contact_collection.insert_one(doc)

        # Send Email Notification
        resend.Emails.send({
            "from": "REVIVO <info@revivo.co.in>",
            "to": ["info@revivo.co.in"],
            "subject": "New Building Inquiry - REVIVO",
            "html": f"""
            <h2>New Building Inquiry</h2>

            <p><b>Name:</b> {data.name}</p>
            <p><b>Phone:</b> {data.phone}</p>
            <p><b>Email:</b> {data.email}</p>
            <p><b>Building Name:</b> {data.buildingName}</p>
            <p><b>Number of Flats:</b> {data.numberOfFlats}</p>
            <p><b>Location:</b> {data.location}</p>
            <p><b>Preferred Visit Date:</b> {data.preferredDate}</p>

            <hr>
            <p>Submitted from revivo.co.in</p>
            """
        })

        return {
            "status": "success",
            "message": "Your request has been submitted successfully! We'll contact you soon.",
            "id": doc["id"],
        }

    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# Admin endpoint to view leads
# -----------------------------
@api.get("/contacts")
def get_contacts():
    items = list(contact_collection.find({}, {"_id": 0}).sort("timestamp", -1))
    return items


app.include_router(api)


# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}


@app.get("/hello")
def say_hello():
    return {"message": "Hello from FastAPI 🚀"}