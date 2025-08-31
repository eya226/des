import os
import requests
from flask import Flask, jsonify, request
from dotenv import load_dotenv

import ai_generator
import stripe_service # Import the new stripe service

load_dotenv()
app = Flask(__name__)

# --- Configuration ---
PRINTFUL_API_KEY = os.getenv('PRINTFUL_API_KEY', 'placeholder')
PRINTFUL_API_URL = 'https://api.printful.com'
# Add Stripe Key placeholder
STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY', 'placeholder_stripe_key')

# --- Mock Data ---
# Add price to mock data for checkout
MOCK_PRODUCTS = {
    "1": {"id": 1, "name": "Midnight Rebellion Hoodie", "thumbnail_url": "/mockups/hoodie1.jpg", "price": 6660}, # price in cents
    "2": {"id": 2, "name": "Obsidian Chalice Mug", "thumbnail_url": "/mockups/mug1.jpg", "price": 2500},
    "3": {"id": 3, "name": "Gothic Spire T-Shirt", "thumbnail_url": "/mockups/tshirt1.jpg", "price": 3500},
}

def get_mock_printful_response():
    return {"code": 200, "result": list(MOCK_PRODUCTS.values())}

# --- API Client ---
def get_store_products():
    if PRINTFUL_API_KEY == 'placeholder':
        return get_mock_printful_response()
    # Real API call logic remains here...

# --- API Routes ---
@app.route('/api/products', methods=['GET'])
def list_products():
    data = get_store_products()
    if data and 'result' in data:
        return jsonify(data['result'])
    return jsonify({'error': 'Failed to fetch products.'}), 500

@app.route('/api/products/generate-descriptions', methods=['POST'])
def generate_product_descriptions():
    data = request.get_json()
    if not data or 'product_id' not in data:
        return jsonify({'error': 'Missing product_id'}), 400
    product = MOCK_PRODUCTS.get(str(data['product_id']))
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    category = ai_generator.get_product_category(product.get('thumbnail_url', ''))
    tech_desc = ai_generator.generate_technical_description(category)
    poetic_desc = ai_generator.generate_poetic_description(category)

    return jsonify({
        'product_id': product['id'],
        'generated_technical_description': tech_desc,
        'generated_poetic_description': poetic_desc
    })

@app.route('/api/checkout/create-session', methods=['POST'])
def create_checkout_session_endpoint():
    """
    Creates a placeholder Stripe checkout session.
    Expects {'product_id': '...', 'quantity': ...} in the request body.
    """
    data = request.get_json()
    if not data or 'product_id' not in data or 'quantity' not in data:
        return jsonify({'error': 'Missing product_id or quantity'}), 400

    product_id = str(data['product_id'])
    quantity = data['quantity']

    product = MOCK_PRODUCTS.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    product_name = product.get('name')
    price_in_cents = product.get('price')

    # Call the (placeholder) stripe service
    session = stripe_service.create_checkout_session(product_name, price_in_cents)

    if session and 'url' in session:
        # In a real app, we'd return the session ID and URL
        return jsonify({'checkout_url': session['url']})
    else:
        return jsonify({'error': 'Failed to create checkout session'}), 500

@app.route('/')
def index():
    return "Gothic Backend is running."

# Import the marketing agent
from marketing_agent import agent as marketing_agent

@app.route('/api/marketing/generate-for-product', methods=['POST'])
def generate_marketing_endpoint():
    """
    Triggers the marketing agent for a specific product.
    Expects {'product_id': '...'}
    """
    data = request.get_json()
    if not data or 'product_id' not in data:
        return jsonify({'error': 'Missing product_id'}), 400

    product_id = str(data['product_id'])
    product = MOCK_PRODUCTS.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    # This call is synchronous for now. In a real app, this would
    # be an asynchronous task pushed to a queue (e.g., Celery, RQ).
    marketing_agent.run_marketing_for_new_product(product)

    return jsonify({'message': f"Marketing campaign started for {product['name']}. Check server logs for details."})


if __name__ == '__main__':
    app.run(debug=True, port=5001)
