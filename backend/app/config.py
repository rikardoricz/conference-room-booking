from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()


class Config:
    sqlalchemy_database_uri = os.getenv("SQLALCHEMY_DATABASE_URI")
    secret_key = os.getenv("SECRET_KEY")
    jwt_secret_key = os.getenv("JWT_SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = sqlalchemy_database_uri
    
    SECRET_KEY = secret_key
    JWT_SECRET_KEY = jwt_secret_key
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)
    JWT_TOKEN_LOCATION = ['headers']
    
