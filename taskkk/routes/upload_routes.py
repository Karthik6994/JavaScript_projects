from flask import request, jsonify
from . import bp
from db import db
from models import Task
import pandas as pd
from datetime import datetime

@bp.route("/api/upload-xlsx", methods=["POST"])
def upload_xlsx():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    df = pd.read_excel(file)

    for _, row in df.iterrows():
        task = Task(
            project=row["Project"],
            task_name=row["Task Name"],
            assigned_to=row["Assigned To"],
            start_date=pd.to_datetime(row["Start Date"]).date(),
            end_date=pd.to_datetime(row["End Date"]).date(),
            days_required=int(row["Days Required"]),
            progress=float(str(row["Progress"]).replace("%", "")),
        )
        db.session.add(task)

    db.session.commit()
    return jsonify({"message": "Data uploaded successfully!"})
