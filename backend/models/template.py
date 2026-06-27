from datetime import datetime
from app import db
from models.user import generate_uuid

class Template(db.Model):
    __tablename__ = 'templates'
    
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    key_wins = db.Column(db.Text, nullable=True)
    risks = db.Column(db.Text, nullable=True)
    recommended_actions = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    reports = db.relationship('Report', backref='template', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'key_wins': self.key_wins,
            'risks': self.risks,
            'recommended_actions': self.recommended_actions,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
