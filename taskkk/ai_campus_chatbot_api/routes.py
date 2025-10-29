from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import database, services, schemas
from typing import List

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Chat endpoint (requires session_id)
@router.post("/chat", response_model=schemas.ChatResponse)
def chat(req: schemas.ChatRequest, db: Session = Depends(get_db)):
    if not req.session_id:
        raise HTTPException(status_code=400, detail="User cannot converse without a session_id")
    session = services.get_session(db, req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    # save user message
    services.add_message(db, req.session_id, "user", req.message)
    # bot reply
    reply, _ = services.generate_reply(db, req.message)
    services.add_message(db, req.session_id, "bot", reply)
    # return full conversation
    conv = services.get_messages(db, req.session_id)
    return {"reply": reply, "conversation": conv}

# Enrollment
@router.post("/enroll", response_model=schemas.EnrollmentOut)
def enroll(request: schemas.EnrollmentRequest, db: Session = Depends(get_db)):
    # simple check: course exists?
    course = db.query.__self__.query  # intentionally simple beginner-style (we'll not over-complicate)
    enroll = services.enroll_course(db, request.user_email, request.course_id)
    return enroll

# Courses list
@router.get("/courses", response_model=List[schemas.CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return services.list_courses(db)

# Courses search
@router.get("/courses/search", response_model=List[schemas.CourseOut])
def search_courses(keyword: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    return services.search_courses(db, keyword)

# Enrollments
@router.get("/enrollments", response_model=List[schemas.EnrollmentOut])
def get_enrollments(db: Session = Depends(get_db)):
    return services.get_enrollments(db)

# Create session
@router.post("/session", response_model=schemas.SessionOut)
def create_session(user_email: str = Query(None), db: Session = Depends(get_db)):
    s = services.create_session(db, user_email)
    return services.get_session(db, s.id)

# Chat history by email
@router.get("/chat-history", response_model=List[schemas.SessionOut])
def chat_history(user_email: str = Query(...), db: Session = Depends(get_db)):
    if not user_email:
        raise HTTPException(status_code=400, detail="History cannot be retrieved without user email")
    sessions = services.get_sessions_by_email(db, user_email)
    return sessions
