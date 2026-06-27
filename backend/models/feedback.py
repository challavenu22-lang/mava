from datetime import datetime
from app import db
from models.user import generate_uuid

class Feedback(db.Model):
    __tablename__ = 'feedback'
    
    id = db.Column(db.String, primary_key=True, default=generate_uuid)
    report_id = db.Column(db.String, db.ForeignKey('reports.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'report_id': self.report_id,
            'rating': self.rating,
            'comment': self.comment,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
