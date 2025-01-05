from flask import jsonify, request
from app.models.room import Room
from app.models.user import User
from app.models.reservation import Reservation
from app.models.notification import Notification
from flask_jwt_extended import jwt_required, get_jwt_identity

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
            return jsonify({"message": "Room not found"}), 404

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
                "created_at": user.created_at
            }
            return jsonify(user_data)
        else:
            return jsonify({"message": "User profile not found"}), 404
        
    @app.route('/notifications', methods=['GET'])
    @jwt_required()
    def notifications():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first()
        user_id = user.user_id

        notifications = Notification.query.filter_by(user_id=user_id).all()

        notifications_list = [{ "notification_id": notification.notification_id,
                                "user_id": notification.user_id,
                                "reservation_id": notification.reservation_id,
                                "title": notification.title,
                                "message": notification.message,
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
            return jsonify({"error": "Missing status field"}), 400

        notification = Notification.query.filter_by(notification_id=notification_id, user_id=user.user_id).first()

        if not notification:
            return jsonify({"error": "Notification not found"}), 404

        notification.status = new_status
        db.session.commit()

        return jsonify({"message": "Notification status updated successfully", 
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
        
        required_fields = ['start_time', 'end_time', 'room_id']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify(
                msg=f'Missing fields: {", ".join(missing_fields)}'
                ), 400

        start_time = data.get('start_time')
        end_time = data.get('end_time')
        room_id = data.get('room_id')

        if not start_time or not end_time or not room_id:
            return jsonify(
                msg="Missing argument"
                ), 400
        
        conflict = Reservation.query.filter(
            Reservation.room_id == room_id,
            Reservation.start_time < end_time, 
            Reservation.end_time > start_time  
        ).first()

        if conflict:
            return jsonify(msg="Room already reserved during this time."
            ), 400

        new_reservation = Reservation(user_id=user_id,room_id=room_id,start_time=start_time,end_time=end_time)
        db.session.add(new_reservation)
        db.session.commit()

        return jsonify(
                    msg=f"Reservation Successful, {new_reservation}"
                )
    
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
                            "created_at":reservation.created_at
                        } for reservation in reservations]

        return jsonify(reservations_list)

        
