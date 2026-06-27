from flask import Blueprint, request, jsonify
from app import db
from models.report import Report
from services.ai_service import generate_ai_summary
from utils.auth import login_required
from utils.validators import validate_register_data # Can create a validate_generate_data

generate_bp = Blueprint('generate', __name__)

@generate_bp.route('/generate', methods=['POST'])
@login_required
def generate_summary(current_user):
    data = request.get_json()
    
    if not data or not data.get('report_title'):
        return jsonify({'error': 'Report title is required'}), 400
        
    title = data.get('report_title')
    key_wins = data.get('key_wins', 'Not specified')
    risks = data.get('risks', 'Not specified')
    recommended_actions = data.get('recommended_actions', 'Not specified')
    template_id = data.get('template_id')
    
    # Call AI service
    ai_result = generate_ai_summary(
        title=title,
        key_wins=key_wins,
        risks=risks,
        recommended_actions=recommended_actions
    )
    
    # Save to database
    report = Report(
        user_id=current_user.id,
        template_id=template_id,
        title=title,
        executive_summary=ai_result.get('executive_summary', ''),
        key_insights=ai_result.get('key_insights', []),
        recommendations=ai_result.get('recommendations', []),
        status=ai_result.get('status', 'OK')
    )
    
    db.session.add(report)
    db.session.commit()
    
    return jsonify(report.to_dict()), 201
