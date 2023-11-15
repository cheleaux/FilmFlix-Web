from flask import Flask
from .Models import db
from .views import views
import json


def create_app():
    app = Flask(__name__, template_folder='templates')
    app.register_blueprint(views, ulr_prefix="/")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://cheleaux:5iTFvLPyo3373Orp3W1RhprbipLAacuZ@dpg-clad289m6hds73dhqpi0-a/flimflix'
    db.init_app(app)
    return app
