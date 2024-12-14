from flask import request, redirect, url_for, flash
from app.models.user import User
from flask_login import current_user, login_user,logout_user,login_required


def auth_routes(app,db):

    @app.route('/login', methods=['GET','POST'])
    def login():
        if request.method == 'POST':
            username = 'ondre' #request.form['username'] jesli tak to dziala w react native
            password = 'ondre' #request.form['password']
            
            user = User.query.filter_by(username=username).first()
            
            if user and user.check_password(password):
                login_user(user)
                #flash('Login successful!', 'success')
                return 'Login Succesful' #redirect(url_for('dashboard'))
            else:
                #flash('Login Unsuccessful. Please check username and password.!', 'failed')
                return 'Login Unsuccessful. Please check username and password.'
    
        return 'Login Page'

    @app.route('/register', methods=['GET','POST'])
    def register():
        if request.method == 'POST':
            #data
            #if sprawdzajace czy istnieje juz taki user 
            #new_user = User(username='ondre', email='ondre@example.com', password='ondre')
            #db.session.add(new_user)
            #db.session.commit()

            return 'POST register'
        return 'Get register'

    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return 'Success logout' #redirect(url_for('login'))
