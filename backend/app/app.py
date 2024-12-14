from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import Config
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.secret_key = 'KEY' # To zmienic bo to klucz sesji chyba
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)

    from app.models.user import User
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    from app.api.auth import auth_routes
    auth_routes(app,db)

    migrate = Migrate(app,db)

    return app