from flask import Flask
from .views import views
import json


def create_app():
    app = Flask(__name__)
    app.config.from_file('../config.json', load=json.load)
    app.register_blueprint(views, ulr_prefix='/')
    return app