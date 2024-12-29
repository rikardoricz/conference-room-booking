from app.app import db
from datetime import datetime, timezone, timedelta

class Room(db.Model):
    __tablename__ = "rooms"

    room_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    capacity = db.Column(db.Integer)
    location = db.Column(db.String(255))
    has_projector = db.Column(db.Boolean)
    has_whiteboard = db.Column(db.Boolean)
    status = db.Column(db.String(50))
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone(timedelta(hours=1))), nullable=False)  

    def __init__(self):
        pass

    def __repr__(self):
        return f'<Room id: {self.room_id}>'
