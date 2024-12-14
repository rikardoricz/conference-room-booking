from app.app import db
from datetime import datetime

class Reservation(db.Model):
    __tablename__ = "reservations"

    reservation_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    room_id = db.Column(db.Integer, db.ForeignKey('user.room_id'))
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow, nullable=False)
    status = db.Column(db.String(50),nullable=False)

    def __init__(self): # ?
        pass

    def __repr__(self):
        return f'<Reservation id: {self.reservation_id}>'