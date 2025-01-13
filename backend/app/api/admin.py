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
    @app.route('/edit-role', methods=['POST'])
    @jwt_required()
    def edit_user():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first() 
        
        if user.role != 'admin':
            return jsonify(
                msg='Authorization Error! Invalid role'
            ), 403
        
        if not request.is_json:
            return jsonify(
                msg="Missing json in request"
            ), 400

        data = request.get_json()
        username=data.get('username')
        role=data.get('role','user')
        
        if not username:
            return jsonify(
                msg='No username provided!'
            ), 409

        target_user = User.query.filter_by(username=username).first()

        if not target_user:
            return jsonify(
                msg='User not found!'
            ), 404

        target_user.role = role
        db.session.commit() 

        return jsonify(
            msg='User role updated successfully!'
        ), 200

    @app.route('/edit-user-password', methods=['POST'])
    @jwt_required()
    def edit_role():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first() 
        
        if user.role != 'admin':
            return jsonify(
                msg='Authorization Error! Invalid role'
            ), 403
        
        if not request.is_json:
            return jsonify(
                msg="Missing json in request"
            ), 400

        data = request.get_json()
        username=data.get('username')
        password=data.get('password','a')
        
        if not username:
            return jsonify(
                msg='No username provided!'
            ), 409

        target_user = User.query.filter_by(username=username).first()

        if not target_user:
            return jsonify(
                msg='User not found!'
            ), 404

        target_user.edit_password(password)
        db.session.commit() 

        return jsonify(
            msg='User password updated successfully!'
        ), 200

    @app.route('/delete-user', methods=['DELETE'])
    @jwt_required()
    def edit_user_password():
        current_user = get_jwt_identity()
        user = User.query.filter_by(username=current_user).first() 
        
        if user.role != 'admin':
            return jsonify(
                msg='Authorization Error! Invalid role'
            ), 403
        
        if not request.is_json:
            return jsonify(
                msg="Missing json in request"
            ), 400

        data = request.get_json()
        username=data.get('username')
        
        if not username:
            return jsonify(
                msg='No username provided!'
            ), 409

        target_user = User.query.filter_by(username=username).first()

        if not target_user:
            return jsonify(
                msg='User not found!'
            ), 404

        db.session.delete(target_user)
        db.session.commit() 

        return jsonify(
            msg='User deleted successfully!'
        ), 200
        
