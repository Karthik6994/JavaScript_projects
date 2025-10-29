from fastapi import FastAPI
from routes import router
import database

app = FastAPI(title="AI Campus Assistant Chatbot API - Beginner")

# ensure tables exist
database.init_db()

app.include_router(router, prefix="/api")

@app.get("/", tags=["Welcome"])
def welcome():
    return {
        "message": "Welcome to AI Campus Assistant Chatbot API",
        "docs_url": "/docs",
        "available_endpoints": [
            "/api/chat",
            "/api/enroll",
            "/api/courses",
            "/api/courses/search",
            "/api/sessions",
            "/api/enrollments",
            "/api/chat-history"
        ]
    }
