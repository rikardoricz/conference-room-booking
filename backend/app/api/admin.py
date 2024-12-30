from flask import jsonify, request
from app.models.room import Room
from app.models.user import User

from flask_jwt_extended import jwt_required, get_jwt_identity

def admin_routes(app,db):
    @app.route('/add-room', methods=['GET','POST'])
    @jwt_required()
    def add_room():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first() 
        
        if user.role != 'admin':
            return jsonify(
                msg='Authorization Error! Invalid role'
            ), 409

        if request.method == 'POST':
            if not request.is_json:
                return jsonify(
                    msg="Missing json in request"
                ), 400
            
            data = request.get_json()

            name=data.get('name',None)
            capacity=data.get('capacity',None)
            location=data.get('location',None)
            has_projector=data.get('has_projector',False)
            has_whiteboard=data.get('has_whiteboard',False)
            status=data.get('status','Unoccupied')
            
            new_room = Room(name,capacity,location,has_projector,has_whiteboard,status)

            db.session.add(new_room)
            db.session.commit()

            return jsonify(
                msg=f'Succesfully added room, {new_room}'
            )

        return 'Add room page'