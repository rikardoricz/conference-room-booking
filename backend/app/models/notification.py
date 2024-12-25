from app.app import db
from datetime import datetime

class Notification(db.Model):
    __tablename__ = "notifications"

    notification_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservations.reservation_id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    message = db.Column(db.String(500))
    created_at = db.Column(db.DateTime,default=datetime.utcnow, nullable=False)
    status = db.Column(db.String(50),nullable=False)

    def __init__(self):
        pass

    def __repr__(self):
        return f'<Notification id: {self.notification_id}>'
