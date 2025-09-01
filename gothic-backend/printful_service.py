import os
import requests
from flask import jsonify

PRINTFUL_API_URL = "https://api.printful.com"

def get_products():
    """
    Fetches the list of sync products from the Printful store.
    """
    api_key = os.getenv("PRINTFUL_API_KEY")
    if not api_key:
        return jsonify({"error": "Printful API key is not configured."}), 500

    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    try:
        response = requests.get(f"{PRINTFUL_API_URL}/store/products", headers=headers)
        response.raise_for_status()  # Raise an exception for bad status codes

        # The actual products are in the 'result' key of the response
        return jsonify(response.json().get('result', []))

    except requests.exceptions.RequestException as e:
        # Log the error for debugging purposes
        print(f"Error fetching products from Printful: {e}")
        return jsonify({"error": "Failed to fetch products from Printful."}), 500
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred."}), 500
