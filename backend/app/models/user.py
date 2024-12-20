from app.app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password_hashed = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    role = db.Column(db.String(30))
    reservations = db.relationship('Reservation', backref='user')
    notifications = db.relationship('Notification', backref='user')
    invitations = db.relationship('Invitation', backref='user')

    def __init__(self,username,email,password):
        self.username = username
        self.email = email
        self.password_hashed = generate_password_hash(password)
        self.role = "user"

    def check_password(self, password):
        return check_password_hash(self.password_hashed, password)

    def get_id(self):
        return self.user_id

    def __repr__(self):
        return f'<User: {self.username}>'
    
