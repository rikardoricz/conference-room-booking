from app.app import db
from datetime import datetime

class Reservation(db.Model):
    __tablename__ = "reservations"

    reservation_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'),nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.room_id'),nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow, nullable=False)
    status = db.Column(db.String(50))
    notifications_reservation_id = db.relationship('Notification', backref='reservation')
    invitations_reservation_id = db.relationship('Invitation', backref='reservation')

    def __init__(self,user_id,room_id,start_time,end_time):
        self.user_id=user_id
        self.room_id=room_id
        self.start_time=start_time
        self.end_time=end_time

    def __repr__(self):
        return f'<Reservation id: {self.reservation_id}>'