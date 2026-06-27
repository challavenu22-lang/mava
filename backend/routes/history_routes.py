from flask import Blueprint, jsonify, request
from app import db
from models.report import Report
from models.feedback import Feedback
from utils.auth import login_required

history_bp = Blueprint('history', __name__)

@history_bp.route('/history', methods=['GET'])
@login_required
def get_history(current_user):
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('limit', 10, type=int)
    search = request.args.get('search', '', type=str)
    
    query = Report.query.filter_by(user_id=current_user.id)
    
    if search:
        query = query.filter(Report.title.ilike(f'%{search}%'))
        
    pagination = query.order_by(Report.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
    
    reports = []
    for r in pagination.items:
        r_dict = r.to_dict()
        # Add a snippet for the frontend list
        r_dict['preview'] = r.executive_summary[:100] + '...' if len(r.executive_summary) > 100 else r.executive_summary
        r_dict['date'] = r_dict['created_at'].split('T')[0] if r_dict['created_at'] else None
        reports.append(r_dict)
        
    return jsonify({
        'reports': reports,
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200

@history_bp.route('/history/<string:report_id>', methods=['GET'])
@login_required
def get_report(current_user, report_id):
    report = Report.query.filter_by(id=report_id, user_id=current_user.id).first()
    if not report:
        return jsonify({'error': 'Report not found'}), 404
        
    return jsonify(report.to_dict()), 200

@history_bp.route('/feedback', methods=['POST'])
@login_required
def submit_feedback(current_user):
    data = request.get_json()
    
    if not data or not data.get('report_id') or not data.get('rating'):
        return jsonify({'error': 'Missing report_id or rating'}), 400
        
    # Verify report belongs to user
    report = Report.query.filter_by(id=data['report_id'], user_id=current_user.id).first()
    if not report:
        return jsonify({'error': 'Report not found or unauthorized'}), 404
        
    # Check if feedback already exists
    feedback = Feedback.query.filter_by(report_id=report.id).first()
    if feedback:
        feedback.rating = data['rating']
        feedback.comment = data.get('comment', feedback.comment)
    else:
        feedback = Feedback(
            report_id=report.id,
            rating=data['rating'],
            comment=data.get('comment', '')
        )
        db.session.add(feedback)
        
    db.session.commit()
    
    return jsonify({'message': 'Feedback submitted successfully', 'feedback': feedback.to_dict()}), 201
