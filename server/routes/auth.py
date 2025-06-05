from flask import Blueprint, request, jsonify
from models import db, User
from flask_jwt_extended import create_access_token
import hashlib

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"error": "Missing username or password"}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    
    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    user = User.query.filter_by(username=username).first()
    if not user or user.password != hashlib.sha256(password.encode()).hexdigest():
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=username)
    return jsonify({"access_token": access_token}), 200