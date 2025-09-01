import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

from ai_generator import ai_generator
from stripe_service import create_checkout_session
from printful_service import get_products
# Import the marketing agent
from marketing_agent import agent as marketing_agent

app = Flask(__name__)

@app.route('/')
def index():
    return "Gothic Backend is running."

# --- API Routes ---

@app.route('/api/products', methods=['GET'])
def list_products():
    """
    Lists products from the configured Printful store.
    """
    return get_products()

@app.route('/api/checkout/create-session', methods=['POST'])
def create_checkout_session_endpoint():
    """
    Creates a Stripe checkout session.
    Expects {'product_name': '...', 'price_in_cents': ...} in the request body.
    """
    data = request.get_json()
    if not data or 'product_name' not in data or 'price_in_cents' not in data:
        return jsonify({'error': 'Missing product_name or price_in_cents'}), 400

    product_name = data['product_name']
    price_in_cents = data['price_in_cents']

    if not isinstance(price_in_cents, int) or price_in_cents <= 0:
        return jsonify({'error': 'Invalid price_in_cents'}), 400

    # Call the stripe service to create a real session
    return create_checkout_session(product_name, price_in_cents)


# The following routes are placeholders for AI and Marketing agents
# and will be implemented in later steps. They use mock data for now.

MOCK_PRODUCTS_FOR_AI = {
    "1": {"id": 1, "name": "Midnight Rebellion Hoodie", "thumbnail_url": "/mockups/hoodie1.jpg", "price": 6660},
    "2": {"id": 2, "name": "Obsidian Chalice Mug", "thumbnail_url": "/mockups/mug1.jpg", "price": 2500},
    "3": {"id": 3, "name": "Gothic Spire T-Shirt", "thumbnail_url": "/mockups/tshirt1.jpg", "price": 3500},
}

@app.route('/api/products/generate-descriptions', methods=['POST'])
def generate_product_descriptions():
    data = request.get_json()
    if not data or 'product_id' not in data:
        return jsonify({'error': 'Missing product_id'}), 400

    # NOTE: This uses mock data as the product source is now Printful
    product = MOCK_PRODUCTS_FOR_AI.get(str(data['product_id']))
    if not product:
        return jsonify({'error': 'Product not found for description generation'}), 404

    category = ai_generator.get_product_category(product.get('thumbnail_url', ''))
    tech_desc = ai_generator.generate_technical_description(category)
    poetic_desc = ai_generator.generate_poetic_description(category)

    return jsonify({
        'product_id': product['id'],
        'generated_technical_description': tech_desc,
        'generated_poetic_description': poetic_desc
    })

@app.route('/api/marketing/generate-for-product', methods=['POST'])
def generate_marketing_endpoint():
    """
    Triggers the marketing agent for a specific product.
    """
    data = request.get_json()
    if not data or 'product_id' not in data:
        return jsonify({'error': 'Missing product_id'}), 400

    # NOTE: This uses mock data as the product source is now Printful
    product = MOCK_PRODUCTS_FOR_AI.get(str(data['product_id']))
    if not product:
        return jsonify({'error': 'Product not found for marketing generation'}), 404

    # This call is synchronous for now. In a real app, this would
    # be an asynchronous task pushed to a queue (e.g., Celery, RQ).
    marketing_agent.run_marketing_for_new_product(product)

    return jsonify({'message': f"Marketing campaign started for {product['name']}. Check server logs for details."})


if __name__ == '__main__':
    # Use 0.0.0.0 to make it accessible from outside the container
    app.run(host='0.0.0.0', port=5001, debug=True)
