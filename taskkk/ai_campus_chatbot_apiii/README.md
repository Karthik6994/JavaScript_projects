# AI Campus Assistant Chatbot API (Beginner) - FastAPI (SQLite)

## Overview
Simple beginner-friendly FastAPI backend implementing:
- SQLite database (database.db)
- Rule-based chatbot
- Required endpoints:
  - GET  /           (welcome)
  - POST /api/chat
  - POST /api/enroll
  - GET  /api/courses
  - GET  /api/courses/search?keyword=...
  - GET  /api/enrollments
  - POST /api/session
  - GET  /api/chat-history?user_email=...

## Setup (exact steps)
1. Create & activate venv:
   - Linux/Mac:
     ```
     python -m venv .venv
     source .venv/bin/activate
     ```
   - Windows:
     ```
     python -m venv .venv
     .venv\Scripts\activate
     ```

2. Install requirements:
   ```
   pip install -r requirements.txt
   ```

3. Initialize DB and create tables (this also happens when starting the app, but you can run manually):
   ```
   python -c "import database; database.init_db()"
   ```

4. Populate sample data using raw SQL commands (as requested):
   ```
   python run_sql_seed.py
   ```
   This will execute the `seed_sql.sql` statements and insert sample course rows.

5. Run the server:
   ```
   uvicorn main:app --reload
   ```

6. Visit interactive docs: http://127.0.0.1:8000/docs

## Notes
- The seed is applied via SQL statements inside `seed_sql.sql`. You can edit that file and re-run `python run_sql_seed.py`.
- `/api/chat` requires a valid `session_id` — the API will return the full conversation for that session after a chat message.
