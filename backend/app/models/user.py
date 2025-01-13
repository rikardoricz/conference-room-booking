from app.app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timezone, timedelta

class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hashed = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone(timedelta(hours=1))), nullable=False)
    role = db.Column(db.String(30))
    avatar = db.Column(db.String(250), default="LINK DO BASIC AVATARA")
    reservations = db.relationship('Reservation', backref='user', passive_deletes=True)
    notifications = db.relationship('Notification', backref='user', passive_deletes=True)
    invitations = db.relationship('Invitation', backref='user', passive_deletes=True)

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password_hashed = generate_password_hash(password)
        self.role = "user"

    def check_password(self, password):
        return check_password_hash(self.password_hashed, password)
    
    def edit_password(self, password):
        self.password_hashed = generate_password_hash(password)

    def get_id(self):
        return self.user_id

    def __repr__(self):
        return f'<User: {self.username}>'
    
