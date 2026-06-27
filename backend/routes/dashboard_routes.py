from flask import Blueprint, jsonify
from app import db
from models.report import Report
from models.feedback import Feedback
from utils.auth import login_required

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
@login_required
def get_dashboard(current_user):
    # Fetch user's reports
    reports = Report.query.filter_by(user_id=current_user.id).order_by(Report.created_at.desc()).all()
    
    total_reports = len(reports)
    
    # Calculate this month's reports
    import datetime
    now = datetime.datetime.utcnow()
    monthly_reports = len([r for r in reports if r.created_at.month == now.month and r.created_at.year == now.year])
    
    # Calculate average rating
    # Find all feedback for these reports
    report_ids = [r.id for r in reports]
    feedbacks = Feedback.query.filter(Feedback.report_id.in_(report_ids)).all() if report_ids else []
    
    if feedbacks:
        average_rating = round(sum(f.rating for f in feedbacks) / len(feedbacks), 1)
    else:
        average_rating = 0.0
        
    recent_reports = [r.to_dict() for r in reports[:5]]
    # Add dummy ratings to recent reports if feedback exists
    for r in recent_reports:
        fb = next((f for f in feedbacks if f.report_id == r['id']), None)
        r['rating'] = fb.rating if fb else None
        # Provide a quick preview for recent reports dashboard card
        r['date'] = r['created_at'].split('T')[0] if r['created_at'] else None
        
    return jsonify({
        'totalReports': total_reports,
        'averageRating': average_rating,
        'monthlyReports': monthly_reports,
        'recentReports': recent_reports
    }), 200
