from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timezone
from pymongo import MongoClient
import uuid

app = FastAPI()

# Allow React (localhost:3000) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://revivo-final.vercel.app",
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# MongoDB
import os
from pymongo import MongoClient

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not set")

client = MongoClient(MONGO_URI)
db = client["revivo_db"]
contact_collection = db["contact_requests"]

api = APIRouter(prefix="/api")


class ContactFormRequest(BaseModel):
    name: str
    phone: str
    email: EmailStr
    buildingName: str
    numberOfFlats: int
    location: str
    preferredDate: Optional[str] = ""


@api.get("/")
def api_root():
    return {"message": "API is running ✅"}


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
        contact_collection.insert_one(doc)
        return {
            "status": "success",
            "message": "Your request has been submitted successfully! We'll contact you soon.",
            "id": doc["id"],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@api.get("/contacts")
def get_contacts():
    items = list(contact_collection.find({}, {"_id": 0}).sort("timestamp", -1))
    return items


app.include_router(api)


@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}


@app.get("/hello")
def say_hello():
    return {"message": "Hello from FastAPI 🚀"}