from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from insightface.app import FaceAnalysis
import pickle 
import os
import cv2
import numpy as np
import uuid
import base64
from datetime import datatime, timezone
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "https://172.16.2.48:4200", "http://172.16.2.48:4200"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
GALLERY_PKL_PATH = os.path.join(SCRIPT_DIR, '..', 'gallery.pkl')
MODEL_ROOT = os.path.join(SCRIPT_DIR, '..')
MEETING_RECORDS_PKL_PATH = os.path.join(SCRIPT_DIR, '..', 'meeting_record.pkl')

face_app = FaceAnalysis(name='buffalo_l', root=MODEL_ROOT)
face_app.prepare(ctx_id=0, det_size=(640, 640))

class FaceRecordResponse(BaseModel):
    id: str
    thumbnail_b64: str
    enrolled_at: str
    source_file: str

class PersonGalleryResponse(BaseModel):
    name: str
    department: Optional[str] = None
    photo: list[FaceRecordResponse]

class RenamePersonRequest(BaseModel):
    name: str

class ParticipantRecord(BaseModel):
    name: str
    department: Optional[str] = None
    status: str # "present" or "absent"
    present_at: Optional[str] = None # None when absent
    face_thumbnail_b64: Optional[str] = None # snapshot used to verify attendance

class MeetingRecord(BaseModel):
    meeting_title: str
    meeting_start_time: str
    meeting_end_time: str
    participants: list[ParticipantRecord]

def load_gallery(gallery):
    if not os.path.exists(GALLERY_PKL_PATH):
        return {}
    with open(GALLERY_PKL_PATH, 'rb') as f:
        return pickle.load(f)

def save_gallery(gallery):
    with open(GALLERY_PKL_PATH, 'wb') as f:
        pickle.dump(gallery, f)

def make_thumbnail_b64(img, bbox, size=112):
    x1, y1, x2, y2 = bbox.astype(int)
    x1, y1 = max(0, x1), max(0, y1)
    face_crop = img[y1:y2, x1:x2]
    face_crop = cv2.resize(face_crop, (size, size))
    success, buffer = cv2.imencode('.jpg', face_crop)
    return base64.b64encode(buffer).decode('utf-8') if success else None

@app.get("/api/faces/gallery", response_model=list[PersonGalleryResponse])
def get_gallery():
    gallery = load_gallery()
    result = []
    for name, data in gallery.items():
        photo = [
            FaceRecordResponse(
                id=r["id"],
                
            )
        ]