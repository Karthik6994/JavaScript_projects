from flask import Blueprint

bp = Blueprint("main", __name__)

from . import database_routes, upload_routes, export_routes, analytics_routes
