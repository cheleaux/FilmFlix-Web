from flask import Flask
from .Models import db, migrate
from .views import views
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__, template_folder='./templates')
    app.register_blueprint(views, ulr_prefix="/")
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://zpourdno:d9aOp2ZFMFlu2JPAd4gpT5Lw-q8rhpmN@rogue.db.elephantsql.com/zpourdno'
    app.config['EXPLAIN_TEMPLATE_LOADING'] = True
    db.init_app(app)
    migrate.init_app( app, db )
    return app
