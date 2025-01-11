from app.app import db
from datetime import datetime, timezone, timedelta

class Notification(db.Model):
    __tablename__ = "notifications"

    notification_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservations.reservation_id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    message = db.Column(db.String(500))
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone(timedelta(hours=1))), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=datetime.now(timezone(timedelta(hours=1))))
    status = db.Column(db.String(50), default="unread", nullable=False)

    def __init__(self):
        pass

    def __repr__(self):
        return f'<Notification id: {self.notification_id}>'
