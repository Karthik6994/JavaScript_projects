from db import db

class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True)
    project = db.Column(db.String(100))
    task_name = db.Column(db.String(100))
    assigned_to = db.Column(db.String(50))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    days_required = db.Column(db.Integer)
    progress = db.Column(db.Float)
