from datetime import timedelta
class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/testdb' # change db name
    
    SECRET_KEY = 'KEY' # change secret
    JWT_SECRET_KEY = 'your_jwt_secret_key' # change secret
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)
    JWT_TOKEN_LOCATION = ['headers']
    