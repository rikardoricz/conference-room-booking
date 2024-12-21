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
        
    @app.route('/rooms/<id>', methods=['GET'])
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
                "reservations": reservations # [f'<Reservation id: {self.reservation_id}>']
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
            reservations = Reservation.query.filter_by(user_id=user.user_id).all()
            notifications = Notification.query.filter_by(user_id=user.user_id).all()
            user_data = {
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "created_at": user.created_at,
                "reservations": reservations, # [f'<Reservation id: {self.reservation_id}>']
                "notifications": notifications # [f'<Notification id: {self.room_id}>']
            }
            return jsonify(user_data)
        else:
            return jsonify({"message": "User not found"}), 404

    
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
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        room_id = data.get('room_id') 
        if not start_time or not end_time or not room_id:
            return jsonify(
                msg="Missing argument"
                ), 400
        
        # add logic to handle time conflicts of the reservations

        new_reservation = Reservation(user_id=user_id,room_id=room_id,start_time=start_time,end_time=end_time)

        return jsonify(
                    msg=f"Reservation Successful, {new_reservation}"
                ) 


        