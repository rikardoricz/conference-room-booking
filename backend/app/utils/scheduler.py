from app.services.notification_service import send_notifications
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask

def start_scheduler(app:Flask):
    scheduler = BackgroundScheduler()
    
    scheduler.add_job(lambda: run_with_app_context(app,send_notifications), 'interval', minutes=0.5)
    scheduler.add_job(lambda: print("Hello scheduler"), 'interval', minutes=0.25)

    scheduler.start()

def run_with_app_context(app:Flask,func):
    with app.app_context():
        func()