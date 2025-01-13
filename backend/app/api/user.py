from flask import jsonify, request
from app.models.room import Room
from app.models.user import User
from app.models.reservation import Reservation
from app.models.notification import Notification
from app.models.invitiations import Invitation
from app.services.notification_service import create_notifications
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

def user_routes(app,db):
    @app.route('/rooms', methods=['GET'])
    @jwt_required()
    def rooms():
        rooms = Room.query.all()
        rooms_list = [{ "id": room.room_id, 
                        "name": room.name,
                        "capacity": room.capacity,
                        "location": room.location,
                        "has_projector": room.has_projector,
                        "has_whiteboard": room.has_whiteboard,
                        "status": room.status
                        } for room in rooms]

        return jsonify(rooms_list)
        
    @app.route('/rooms/<int:id>', methods=['GET'])
    @jwt_required()
    def room(id):
        room = Room.query.get(id)
        if room:
            reservations = Reservation.query.filter_by(user_id=room.room_id).all()
            room_data = {
                "id": room.room_id,
                "name": room.name,
                "capacity": room.capacity,
                "location": room.location,
                "has_projector": room.has_projector,
                "has_whiteboard": room.has_whiteboard,
                "status": room.status,
                "created_at": room.created_at,
                "reservations": [
                    {
                        "reservation_id": reservation.reservation_id,
                        "reservation_start": reservation.start_time,
                        "reservation_end": reservation.end_time
                    } for reservation in reservations
                ] 
            }
            return jsonify(room_data)
        else:
            return jsonify({"msg": "Room not found"}), 404
    
    @app.route('/rooms/available', methods=['GET'])
    @jwt_required()
    def available_rooms():
        start_time = request.args.get('startTime')
        end_time = request.args.get('endTime')

        if not start_time or not end_time:
            return jsonify({"msg": "Both startTime and endTime are required"}), 400

        try:
            start_time = datetime.fromisoformat(start_time)
            end_time = datetime.fromisoformat(end_time)
        except ValueError:
            return jsonify({"msg": "Invalid date format."}), 400

        if start_time >= end_time:
            return jsonify({"msg": "startTime must be earlier than endTime"}), 400

        # query rooms with 'ready' status
        available_rooms = Room.query.filter(Room.status == 'ready').all()

        # filter out rooms that are reserved during given time
        filtered_rooms = []
        for room in available_rooms:
            overlapping_reservations = Reservation.query.filter(
                Reservation.room_id == room.room_id,
                Reservation.start_time < end_time,
                Reservation.end_time > start_time
            ).count()
            if overlapping_reservations == 0:
                filtered_rooms.append({
                    "id": room.room_id,
                    "name": room.name,
                    "capacity": room.capacity,
                    "location": room.location,
                    "has_projector": room.has_projector,
                    "has_whiteboard": room.has_whiteboard,
                    "status": room.status,
                })

        return jsonify(filtered_rooms)

    @app.route('/profile', methods=['GET'])
    @jwt_required()
    def profile():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        if user:
            user_data = {
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "user_id": user.user_id,
                "created_at": user.created_at
            }
            return jsonify(user_data)
        else:
            return jsonify({"msg": "User profile not found"}), 404
        
    @app.route('/notifications', methods=['GET'])
    @jwt_required()
    def notifications():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        user_id = user.user_id

        notifications = Notification.query.filter(Notification.status != 'unsent').filter_by(user_id=user_id).all()

        notifications_list = [{ "notification_id": notification.notification_id,
                                "user_id": notification.user_id,
                                "reservation_id": notification.reservation_id,
                                "title": notification.title,
                                "created_at": notification.created_at.isoformat(),
                                "updated_at": notification.updated_at.isoformat() if notification.updated_at else None,
                                "status": notification.status
                        } for notification in notifications]

        return jsonify(notifications_list)

    @app.route('/notifications/<int:notification_id>', methods=['PATCH'])
    @jwt_required()
    def update_notification_status(notification_id):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()

        data = request.get_json()
        new_status = data.get('status')

        if not new_status:
            return jsonify({"msg": "Missing status field"}), 400

        notification = Notification.query.filter_by(notification_id=notification_id, user_id=user.user_id).first()

        if not notification:
            return jsonify({"msg": "Notification not found"}), 404

        notification.status = new_status
        db.session.commit()

        return jsonify({"msg": "Notification status updated successfully", 
                        "notification_id": notification.notification_id, 
                        "updated_at": notification.updated_at.isoformat() if notification.updated_at else None,
                        "status": notification.status})
    
    @app.route('/reserve', methods=['POST'])
    @jwt_required()
    def reserve():
        if not request.is_json:
            return jsonify(
                msg="Missing json in request"
            ), 400

        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        user_id = user.user_id

        data = request.get_json()
        
        required_fields = ['start_time', 'end_time', 'room_id', 'title']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify(
                msg=f'Missing fields: {", ".join(missing_fields)}'
                ), 400

        start_time = data.get('start_time')
        end_time = data.get('end_time')
        room_id = data.get('room_id')
        title = data.get('title')
        attendees = data.get('attendees', [])

        if not start_time or not end_time or not room_id:
            return jsonify(
                msg="Missing argument"
                ), 400

        if start_time >= end_time:
            return jsonify({"msg": "startTime must be earlier than endTime"}), 400
        room = Reservation.query.filter_by(room_id=room_id).first()

        if not room:
            return jsonify(
                msg="Room do not exist"
            ),400
        
        conflict = Reservation.query.filter(
            Reservation.room_id == room_id,
            Reservation.start_time < end_time, 
            Reservation.end_time > start_time  
        ).first()

        if conflict:
            return jsonify(msg="Room already reserved during this time."
            ), 400

        new_reservation = Reservation(user_id=user_id,room_id=room_id,start_time=start_time,end_time=end_time,title=title)
        db.session.add(new_reservation)
        db.session.commit()

        for attendee_id in attendees:
            invitation = Invitation(
                user_id=attendee_id,
                reservation_id=new_reservation.reservation_id
            )
            db.session.add(invitation)

        db.session.commit()

        #TODO TUTAJ powiadomienia
        create_notifications(new_reservation)

        return jsonify(
                    msg=f"Reservation Successful, {new_reservation}. Invitations sent to {len(attendees)} attendees."
                )
    
    @app.route('/meetings', methods=['GET'])
    @jwt_required()
    def meetings():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        user_id = user.user_id

        reservations = Reservation.query.filter_by(user_id=user_id).all()
        invitations = Invitation.query.filter_by(user_id=user_id).all()
        invitation_reservation_ids = [invitation.reservation_id for invitation in invitations]
        reservations_invited = Reservation.query.filter(Reservation.reservation_id.in_(invitation_reservation_ids)).all()
        meetings = [{
                            "reservation_id":reservation.reservation_id,
                            "user_id":reservation.user_id,
                            "room_id":reservation.room_id,
                            "start_time":reservation.start_time,
                            "end_time":reservation.end_time,
                            "created_at":reservation.created_at,
                            "title":reservation.title,
                            "link_to_photo":Room.query.filter_by(room_id=reservation.room_id).first().photo
                        } for reservation in reservations]
        reservations_from_invites = [{
                            "reservation_id":reservation.reservation_id,
                            "user_id":reservation.user_id,
                            "room_id":reservation.room_id,
                            "start_time":reservation.start_time,
                            "end_time":reservation.end_time,
                            "created_at":reservation.created_at,
                            "title":reservation.title,
                            "link_to_photo":Room.query.filter_by(room_id=reservation.room_id).first().photo
                        } for reservation in reservations_invited]
        meetings.extend(reservations_from_invites)
        return jsonify(meetings)
    
    @app.route('/reservations', methods=['GET'])
    @jwt_required()
    def reservations():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        user_id = user.user_id

        reservations = Reservation.query.filter_by(user_id=user_id).all()
        reservations_list = [{
                            "reservation_id":reservation.reservation_id,
                            "user_id":reservation.user_id,
                            "room_id":reservation.room_id,
                            "start_time":reservation.start_time,
                            "end_time":reservation.end_time,
                            "created_at":reservation.created_at,
                            "title":reservation.title,
                            "has_projector":Room.query.filter_by(room_id=reservation.room_id).first().has_projector,
                            "has_whiteboard":Room.query.filter_by(room_id=reservation.room_id).first().has_whiteboard,
                            "link_to_photo": f"../assets/{Room.query.filter_by(room_id=reservation.room_id).first().photo}"
                        } for reservation in reservations]
        return jsonify(reservations_list)

    @app.route('/reservations/<int:id>', methods=['GET','DELETE'])
    @jwt_required()
    def reservation(id):
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        user_id = user.user_id
        reservation = Reservation.query.filter_by(reservation_id=id).first()

        if not reservation:
            return jsonify(
                msg="Reservation do not exist"
            ), 400

        if reservation.user_id != user_id:
            return jsonify(
                msg="Authorization error"
            ), 409

        if(request.method=='GET'):
            room = Room.query.filter_by(room_id=reservation.room_id).first()

            reservation = {
                                "reservation_id":reservation.reservation_id,
                                "user_id":reservation.user_id,
                                "room_id":reservation.room_id,
                                "start_time":reservation.start_time,
                                "end_time":reservation.end_time,
                                "created_at":reservation.created_at,
                                "title":reservation.title,
                                "link_to_photo":room.photo
                            }
            return jsonify(reservation)
        
        db.session.delete(reservation)
        db.session.commit()
        return jsonify(
            msg=f"Reservation with ID {id} has been deleted."
            )
        
    @app.route('/users', methods=['GET'])
    @jwt_required()
    def get_users():
        users = User.query.filter_by(role="user").all()
        users_list = [{
            "user_id": user.user_id,
            "username": user.username
        }for user in users]
        
        return jsonify(users_list)

