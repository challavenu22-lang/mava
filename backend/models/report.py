from datetime import datetime
from app import db
from models.user import generate_uuid

class Report(db.Model):
    __tablename__ = 'reports'
    
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)
    template_id = db.Column(db.String, db.ForeignKey('templates.id'), nullable=True)
    title = db.Column(db.String(255), nullable=False)
    
    executive_summary = db.Column(db.Text, nullable=False)
    key_insights = db.Column(db.JSON, nullable=False)
    recommendations = db.Column(db.JSON, nullable=False)
    
    status = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    feedback = db.relationship('Feedback', backref='report', uselist=False, lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'template_id': self.template_id,
            'title': self.title,
            'executive_summary': self.executive_summary,
            'key_insights': self.key_insights,
            'recommendations': self.recommendations,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
