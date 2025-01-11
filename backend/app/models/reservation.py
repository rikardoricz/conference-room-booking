from app.app import db
from datetime import datetime, timezone, timedelta

class Reservation(db.Model):
    __tablename__ = "reservations"

    reservation_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'),nullable=False)
    room_id = db.Column(db.Integer, db.ForeignKey('rooms.room_id'),nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now(timezone(timedelta(hours=1))), nullable=False)
    title = db.Column(db.String(100))
    status = db.Column(db.String(50))
    notifications_reservation_id = db.relationship('Notification', backref='reservation')
    invitations_reservation_id = db.relationship('Invitation', backref='reservation')

    def __init__(self,user_id,room_id,start_time,end_time,title=f"Meeting at {start_time}"):
        self.user_id=user_id
        self.room_id=room_id
        self.start_time=start_time
        self.end_time=end_time
        self.title=title

    def __repr__(self):
        return f'<Reservation id: {self.reservation_id}>'
