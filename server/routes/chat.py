from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Product
import re

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/', methods=['POST'])
@jwt_required()
def chat():
    data = request.get_json()
    user_input = data.get('message', '').lower()
    
    # Simple rule-based parsing
    category_match = re.search(r'(electronics|books|clothing|accessories)', user_input)
    price_match = re.search(r'under\s+(\d+)', user_input)
    query_match = re.search(r'show\s+me\s+(.+?)(?=\s+under|\s+category|$)', user_input)
    
    category = category_match.group(1) if category_match else None
    max_price = float(price_match.group(1)) if price_match else None
    query = query_match.group(1) if query_match else ''
    
    products = Product.query
    if query:
        products = products.filter(Product.name.ilike(f'%{query}%'))
    if category:
        products = products.filter(Product.category == category)
    if max_price:
        products = products.filter(Product.price <= max_price)
    
    results = [
        {"id": p.id, "name": p.name, "category": p.category, "price": p.price, "rating": p.rating}
        for p in products.all()[:5]  # Limit to 5 results for chat
    ]
    
    if results:
        response = f"Found {len(results)} products:\n" + "\n".join(
            [f"{p['name']} ({p['category']}) - ${p['price']} (Rating: {p['rating']})" for p in results]
        )
    else:
        response = "Sorry, no products match your query. Try something like 'show me books under 500'."
    
    return jsonify({"response": response}), 200