from flask import Blueprint, request, jsonify
from models import Product
from flask_jwt_extended import jwt_required
from sqlalchemy import or_

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
@jwt_required()
def get_products():
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    max_price = request.args.get('max_price', type=float)
    
    products = Product.query
    if query:
        # Search both name and category (case-insensitive)
        products = products.filter(
            or_(
                Product.name.ilike(f'%{query}%'),
                Product.category.ilike(f'%{query}%')
            )
        )
    if category:
        products = products.filter(Product.category == category)
    if max_price:
        products = products.filter(Product.price <= max_price)
    
    results = [
        {"id": p.id, "name": p.name, "category": p.category, "price": p.price, "rating": p.rating}
        for p in products.all()
    ]
    return jsonify(results), 200