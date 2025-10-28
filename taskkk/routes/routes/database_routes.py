from flask import jsonify
from . import bp
from db import db

@bp.route("/api/database-check", methods=["GET"])
def database_check():
    try:
        db.session.execute("SELECT 1")
        return jsonify({"status": "connected", "message": "Database connection successful!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
