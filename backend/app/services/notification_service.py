from datetime import datetime, timedelta, timezone
from app.models.notification import Notification
from app.models.reservation import Reservation
from app.models.invitiations import Invitation
from app.app import db

def create_notifications(reservation:Reservation):
    now = datetime.utcnow()

    # 1-day before notification
    notification_time_day = reservation.start_time - timedelta(days=1)
    if notification_time_day > now:
        notification = Notification( 
            user_id=reservation.user_id,
            reservation_id=reservation.reservation_id,
            message=f"Meeting '{reservation.title}' is tomorrow at {reservation.start_time}.",
            notification_time=notification_time_day 
        )
        db.session.add(notification)

    # 1-hour before notification
    notification_time_hour =  reservation.start_time - timedelta(hours=1)
    if notification_time_hour > now:
        notification = Notification(
            user_id= reservation.user_id,
            reservation_id=reservation.reservation_id,
            message=f"Meeting '{reservation.title}' starts in 1 hour at {reservation.start_time}.",
            notification_time=notification_time_hour
        )
        db.session.add(notification)

    invitations = Invitation.query.filter_by(reservation_id=reservation.reservation_id).all()

    for invitation in invitations:
        # 1-day before notification
        notification_time_day = reservation.start_time - timedelta(days=1)
        if notification_time_day > now:
            notification = Notification( 
                user_id=invitation.user_id,
                reservation_id=reservation.reservation_id,
                message=f"Meeting '{reservation.title}' is tomorrow at {reservation.start_time}.",
                notification_time=notification_time_day 
            )
            db.session.add(notification)

        # 1-hour before notification
        notification_time_hour =  reservation.start_time - timedelta(hours=1)
        if notification_time_hour > now:
            notification = Notification(
                user_id= invitation.user_id,
                reservation_id=reservation.reservation_id,
                message=f"Meeting '{reservation.title}' starts in 1 hour at {reservation.start_time}.",
                notification_time=notification_time_hour
            )
            db.session.add(notification)

    db.session.commit()

# TODO DODAC TO tam gdzie zmienia sie status
def send_notifications():
    now = datetime.utcnow()

    # fetch notifications that have to be sent now or are late
    notifications = Notification.query.filter(
        Notification.status == 'unsent',
        Notification.notification_time <= now 
    ).all()

    for notification in notifications:
        # if we ever change it to email or push notifications it should be defined here
        print(f"Changed status to unread, {notification.user_id}: {notification.title}")

        notification.status = 'unread'
    db.session.commit()
