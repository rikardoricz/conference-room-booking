from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app.config import Config
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)

    jwt.init_app(app)

    from app.models.notification import Notification
    from app.models.reservation import Reservation
    from app.models.room import Room
    from app.models.user import User
    from app.models.invitiations import Invitation

    from app.api.auth import auth_routes
    auth_routes(app,db)

    from app.api.user import user_routes
    user_routes(app,db)

    migrate = Migrate(app,db)

    return app