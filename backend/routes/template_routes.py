from flask import Blueprint, jsonify, request
from app import db
from models.template import Template
from utils.auth import login_required

template_bp = Blueprint('template', __name__)

@template_bp.route('/templates', methods=['GET'])
@login_required
def get_templates(current_user):
    templates = Template.query.all()
    return jsonify([t.to_dict() for t in templates]), 200

@template_bp.route('/templates', methods=['POST'])
@login_required
def create_template(current_user):
    # Optional: Check if user is admin based on role
    data = request.get_json()
    
    if not data or not data.get('name'):
        return jsonify({'error': 'Template name is required'}), 400
        
    template = Template(
        name=data['name'],
        description=data.get('description', ''),
        key_wins=data.get('key_wins', ''),
        risks=data.get('risks', ''),
        recommended_actions=data.get('recommended_actions', '')
    )
    
    db.session.add(template)
    db.session.commit()
    
    return jsonify({'message': 'Template created successfully', 'template': template.to_dict()}), 201

@template_bp.route('/templates/<string:template_id>', methods=['PUT'])
@login_required
def update_template(current_user, template_id):
    template = Template.query.get(template_id)
    if not template:
        return jsonify({'error': 'Template not found'}), 404
        
    data = request.get_json()
    if 'name' in data:
        template.name = data['name']
    if 'description' in data:
        template.description = data['description']
    if 'key_wins' in data:
        template.key_wins = data['key_wins']
    if 'risks' in data:
        template.risks = data['risks']
    if 'recommended_actions' in data:
        template.recommended_actions = data['recommended_actions']
        
    db.session.commit()
    
    return jsonify({'message': 'Template updated successfully', 'template': template.to_dict()}), 200

@template_bp.route('/templates/<string:template_id>', methods=['DELETE'])
@login_required
def delete_template(current_user, template_id):
    template = Template.query.get(template_id)
    if not template:
        return jsonify({'error': 'Template not found'}), 404
        
    db.session.delete(template)
    db.session.commit()
    
    return jsonify({'message': 'Template deleted successfully'}), 200
