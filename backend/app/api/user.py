from flask import jsonify
from app.models.room import Room
from app.models.user import User
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
            room_data = {
                "id": room.room_id,
                "name": room.name,
                "capacity": room.capacity,
                "location": room.location,
                "has_projector": room.has_projector,
                "has_whiteboard": room.has_whiteboard,
                "status": room.status,
                "created_at": room.created_at
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
                "created_at": user.created_at,
            }
            return jsonify(user_data)
        else:
            return jsonify({"message": "Room not found"}), 404
        