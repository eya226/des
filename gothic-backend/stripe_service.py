import os
import stripe
from flask import jsonify

# --- Configuration ---
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
# It's good practice to load the domain from an environment variable
FRONTEND_DOMAIN = os.getenv('FRONTEND_DOMAIN', 'http://localhost:3000')

def create_checkout_session(product_name: str, price_in_cents: int):
    """
    Creates a Stripe Checkout Session for a given product.
    """
    if not stripe.api_key:
        return jsonify({"error": "Stripe API key is not configured."}), 500

    try:
        # Create a Stripe Checkout Session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': product_name,
                    },
                    'unit_amount': price_in_cents,
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f'{FRONTEND_DOMAIN}/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{FRONTEND_DOMAIN}/', # Redirect to home page on cancel
        )
        return jsonify(session)
    except Exception as e:
        # Log the exception for debugging
        print(f"Error creating Stripe checkout session: {e}")
        return jsonify({"error": str(e)}), 500
