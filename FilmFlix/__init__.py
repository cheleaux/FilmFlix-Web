from flask import Flask
from .Models import db
from .views import views
import json


def create_app():
    app = Flask(__name__)
    app.register_blueprint(views, ulr_prefix="/")
    db.init_app(app)
    return app
