from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from models.user import User
from models.settings import Settings
from utils.auth import generate_token, login_required
from utils.validators import validate_register_data

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    is_valid, error_msg = validate_register_data(data)
    if not is_valid:
        return jsonify({'error': error_msg}), 400
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
        
    hashed_pw = generate_password_hash(data['password'])
    new_user = User(
        full_name=data['full_name'],
        email=data['email'],
        password_hash=hashed_pw
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Create default settings for the new user
    default_settings = Settings(user_id=new_user.id)
    db.session.add(default_settings)
    db.session.commit()
    
    token = generate_token(new_user.id)
    return jsonify({
        'message': 'User created successfully',
        'token': token,
        'user': new_user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing email or password'}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401
        
    token = generate_token(user.id)
    return jsonify({
        'token': token,
        'user': user.to_dict()
    }), 200

@auth_bp.route('/me', methods=['GET'])
@login_required
def get_me(current_user):
    return jsonify(current_user.to_dict()), 200
