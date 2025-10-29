        from sqlalchemy.orm import Session
        import models
        from typing import List, Tuple

        # Courses
        def list_courses(db: Session):
            return db.query(models.Course).all()

        def search_courses(db: Session, keyword: str):
            kw = f"%{keyword.lower()}%"
            return db.query(models.Course).filter(
                (models.Course.name.ilike(kw)) |
                (models.Course.description.ilike(kw)) |
                (models.Course.keywords.ilike(kw)) |
                (models.Course.code.ilike(kw)) |
                (models.Course.category.ilike(kw))
            ).all()

        # Sessions & messages
        def create_session(db: Session, user_email: str = None):
            s = models.Session(user_email=user_email)
            db.add(s)
            db.commit()
            db.refresh(s)
            return s

        def get_session(db: Session, session_id: int):
            return db.query(models.Session).filter(models.Session.id == session_id).first()

        def get_sessions_by_email(db: Session, user_email: str):
            return db.query(models.Session).filter(models.Session.user_email == user_email).all()

        def add_message(db: Session, session_id: int, role: str, text: str):
            m = models.Message(session_id=session_id, role=role, text=text)
            db.add(m)
            db.commit()
            db.refresh(m)
            return m

        def get_messages(db: Session, session_id: int):
            s = get_session(db, session_id)
            return s.messages if s else []

        # ChatBot logic (basic, beginner-friendly)
        def generate_reply(db: Session, message: str):
            text = message.lower().strip()
            # keyword search
            words = [w for w in text.replace(',', ' ').split() if len(w) > 2]
            matched = {}
            for w in words:
                results = search_courses(db, w)
                for c in results:
                    matched[c.id] = c
            if matched:
                courses = list(matched.values())[:5]
                reply = "I found these courses:
" + "\n".join([f"- {c.name} ({c.code})" for c in courses])
                return reply, courses
            if any(x in text for x in ["hello","hi"]):
                return ("Hello! I can help you find courses. Try 'search ai' or 'show python courses'", [])
            if "help" in text:
                return ("I can list courses, search by keyword, enroll you via /api/enroll, and track sessions.", [])
            return ("Sorry, I couldn't find matches. Try asking about 'deep learning', 'nlp', or 'python'.", [])

        # Enrollment
        def enroll_course(db: Session, user_email: str, course_id: int):
            enroll = models.Enrollment(user_email=user_email, course_id=course_id)
            db.add(enroll)
            db.commit()
            db.refresh(enroll)
            return enroll

        def get_enrollments(db: Session):
            return db.query(models.Enrollment).all()
