from flask import Blueprint, jsonify, request
from app import db
from models.settings import Settings
from utils.auth import login_required

settings_bp = Blueprint('settings', __name__)

@settings_bp.route('/settings', methods=['GET'])
@login_required
def get_settings(current_user):
    settings = Settings.query.filter_by(user_id=current_user.id).first()
    if not settings:
        # Should be created during registration, but fallback just in case
        settings = Settings(user_id=current_user.id)
        db.session.add(settings)
        db.session.commit()
        
    return jsonify(settings.to_dict()), 200

@settings_bp.route('/settings', methods=['PUT'])
@login_required
def update_settings(current_user):
    settings = Settings.query.filter_by(user_id=current_user.id).first()
    if not settings:
        settings = Settings(user_id=current_user.id)
        db.session.add(settings)
        
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
        
    if 'dark_mode' in data:
        settings.dark_mode = data['dark_mode']
    if 'email_notifications' in data:
        settings.email_notifications = data['email_notifications']
    if 'startup_page' in data:
        settings.startup_page = data['startup_page']
    if 'export_format' in data:
        settings.export_format = data['export_format']
        
    db.session.commit()
    
    return jsonify({'message': 'Settings updated successfully', 'settings': settings.to_dict()}), 200
