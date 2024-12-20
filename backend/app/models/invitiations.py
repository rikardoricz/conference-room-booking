from app.app import db
from datetime import datetime
class Invitation(db.Model):
    __tablename__ = "invitations"

    invitation_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservations.reservation_id'), nullable=False)
    invited_at = db.Column(db.DateTime,default=datetime.utcnow, nullable=False)  

    def __init__(self):
        pass

    def __repr__(self):
        return f'<Invitation id: {self.invitation_id}>'