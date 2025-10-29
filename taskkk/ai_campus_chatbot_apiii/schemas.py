from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class CourseBase(BaseModel):
    code: str
    name: str
    category: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[str] = None

class CourseOut(CourseBase):
    id: int
    class Config:
        orm_mode = True

class MessageOut(BaseModel):
    id: int
    role: str
    text: str
    created_at: datetime
    class Config:
        orm_mode = True

class SessionOut(BaseModel):
    id: int
    user_email: Optional[EmailStr]
    started_at: datetime
    messages: List[MessageOut] = []
    class Config:
        orm_mode = True

class ChatRequest(BaseModel):
    session_id: int
    message: str

class ChatResponse(BaseModel):
    reply: str
    conversation: List[MessageOut]

class EnrollmentRequest(BaseModel):
    user_email: EmailStr
    course_id: int

class EnrollmentOut(BaseModel):
    id: int
    user_email: EmailStr
    course_id: int
    enrolled_at: datetime
    class Config:
        orm_mode = True
