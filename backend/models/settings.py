from datetime import datetime
from app import db
from models.user import generate_uuid

class Settings(db.Model):
    __tablename__ = 'settings'
    
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    
    dark_mode = db.Column(db.Boolean, default=False)
    email_notifications = db.Column(db.Boolean, default=True)
    startup_page = db.Column(db.String(50), default='dashboard')
    export_format = db.Column(db.String(20), default='pdf')
    
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'dark_mode': self.dark_mode,
            'email_notifications': self.email_notifications,
            'startup_page': self.startup_page,
            'export_format': self.export_format,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
