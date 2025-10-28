from flask import jsonify, request
from . import bp
from models import Task
from db import db
from sqlalchemy import extract, func

@bp.route("/api/analytics/tasks/monthly-aggr", methods=["GET"])
def monthly_aggregation():
    results = (
        db.session.query(
            extract("month", Task.start_date).label("month"),
            func.count(Task.id).label("task_count"),
            func.avg(Task.progress).label("avg_progress"),
        )
        .group_by("month")
        .order_by("month")
        .all()
    )
    return jsonify([{"month": int(r.month), "task_count": r.task_count, "avg_progress": round(r.avg_progress, 2)} for r in results])

@bp.route("/api/analytics/progress/monthly", methods=["GET"])
def monthly_progress_stats():
    results = (
        db.session.query(
            extract("month", Task.start_date).label("month"),
            func.avg(Task.progress).label("avg_progress"),
        )
        .group_by("month")
        .all()
    )
    if not results:
        return jsonify({"message": "No data found"})

    min_month = min(results, key=lambda x: x.avg_progress)
    max_month = max(results, key=lambda x: x.avg_progress)

    return jsonify({
        "min_month": int(min_month.month),
        "min_avg_progress": round(min_month.avg_progress, 2),
        "max_month": int(max_month.month),
        "max_avg_progress": round(max_month.avg_progress, 2),
    })

@bp.route("/api/analytics/tasks", methods=["GET"])
def tasks_by_user():
    user = request.args.get("user_name")
    query = Task.query
    if user:
        query = query.filter(Task.assigned_to.ilike(f"%{user}%"))
    tasks = query.all()
    return jsonify([
        {
            "id": t.id,
            "project": t.project,
            "task_name": t.task_name,
            "assigned_to": t.assigned_to,
            "progress": t.progress,
        } for t in tasks
    ])
