from flask import request, jsonify
from app.models.user import User
from flask_jwt_extended import create_access_token, create_refresh_token,get_jwt_identity,jwt_required


def auth_routes(app,db):

    @app.route('/login', methods=['GET','POST'])
    def login():
        if request.method == 'POST':
            if not request.is_json:
                return jsonify(
                    msg="Missing json in request"
                ), 400

            data = request.get_json()
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return jsonify(
                    msg="Missing username or password"
                    ), 400

            user = User.query.filter_by(username=username).first()

            if user and user.check_password(password):
                access_token = create_access_token(identity=username)
                refresh_token = create_refresh_token(identity=username)

                return jsonify(
                    message=f"Login Successful, {user}",
                    access_token=access_token,
                    refresh_token=refresh_token
                ) 
            else:
                return jsonify(
                    msg='Login Unsuccessful. Please check username and password.'
                ),401
            
        return 'Login Page'

    @app.route('/register', methods=['GET','POST'])
    def register():
        if request.method == 'POST':
            if not request.is_json:
                return jsonify(
                    msg="Missing json in request"
                ), 400
            data = request.get_json()
            email = data.get('email')
            username = data.get('username')
            password = data.get('password')

            user_email = User.query.filter_by(email=email).first()
            user_name = User.query.filter_by(username=username).first()

            if user_email:
                return jsonify(
                    msg="Email already used"
                ), 409
            if user_name:
                return jsonify(
                    msg="Username already used"
                ), 409
            
            new_user = User(username=username, email=email, password=password)

            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=username)
            refresh_token = create_refresh_token(identity=username)

            return jsonify(
                    msg=f"Register Successful, {new_user}",
                    access_token=access_token,
                    refresh_token=refresh_token
                ) 
        return 'Register Page'


    @app.route("/refresh", methods=["POST"])
    @jwt_required(refresh=True)
    def refresh():
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        return jsonify(access_token=new_access_token)
