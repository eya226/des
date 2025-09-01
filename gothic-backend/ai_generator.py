import os
import requests

# --- Configuration ---
HF_API_TOKEN = os.getenv("HUGGING_FACE_API_TOKEN")
IMAGE_TO_TEXT_MODEL = "Salesforce/blip-image-captioning-large"
TEXT_GEN_MODEL = "mistralai/Mistral-7B-Instruct-v0.2"
API_BASE_URL = "https://api-inference.huggingface.co/models/"

def query_huggingface_api(model_id: str, payload: dict, task: str = "text-generation"):
    """
    Generic function to query a Hugging Face Inference API endpoint.
    """
    if not HF_API_TOKEN:
        # Return a default error if the token is not set
        return {"error": "Hugging Face API token is not configured."}

    api_url = API_BASE_URL + model_id
    headers = {"Authorization": f"Bearer {HF_API_TOKEN}"}

    try:
        if task == "image-to-text":
            # For image tasks, the payload is raw bytes
            response = requests.post(api_url, headers=headers, data=payload)
        else:
            # For text tasks, the payload is json
            response = requests.post(api_url, headers=headers, json=payload)

        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error querying Hugging Face API for model {model_id}: {e}")
        return {"error": f"API request failed for model {model_id}."}


def get_product_category(image_url: str) -> str:
    """
    Analyzes a product image using a BLIP model to get a description.
    """
    print(f"AI: Analyzing image from {image_url} with {IMAGE_TO_TEXT_MODEL}...")
    try:
        # Download the image data
        image_response = requests.get(image_url, stream=True)
        image_response.raise_for_status()
        image_data = image_response.content

        # Query the image-to-text model
        result = query_huggingface_api(IMAGE_TO_TEXT_MODEL, payload=image_data, task="image-to-text")

        if "error" in result:
            return "a product" # Fallback on error

        # The response is a list with a dictionary, e.g., [{'generated_text': '...'}]
        return result[0].get('generated_text', 'a product')

    except requests.exceptions.RequestException as e:
        print(f"Failed to download image from {image_url}: {e}")
        return "a product" # Fallback on error


def generate_technical_description(category: str) -> str:
    """
    Generates a technical description using a Mistral model.
    """
    print(f"AI: Generating technical description for '{category}' with {TEXT_GEN_MODEL}...")
    prompt = f"Generate a concise, factual, and technical product description for the following item: {category}. Focus on materials, dimensions, and manufacturing process. Use a neutral tone. Example: 'A 100% cotton t-shirt, pre-shrunk, with a fabric weight of 4.2 oz/yd².'"

    payload = {
        "inputs": prompt,
        "parameters": {"max_new_tokens": 60, "temperature": 0.5}
    }

    result = query_huggingface_api(TEXT_GEN_MODEL, payload)

    if "error" in result:
        return f"A high-quality, {category}. Made with durable materials." # Fallback

    # The response is a list with a dictionary
    return result[0].get('generated_text', f"A high-quality, {category}.")


def generate_poetic_description(category: str) -> str:
    """
    Generates a poetic, gothic marketing description using a Mistral model.
    """
    print(f"AI: Generating poetic description for '{category}' with {TEXT_GEN_MODEL}...")
    prompt = f"Generate a short, poetic, and dark marketing description in a gothic style for the following item: {category}. Use evocative and mysterious language. Maximum 2 sentences. Example: 'From this chalice, sip the essence of twilight. Let each drop fortify your rebellious spirit.'"

    payload = {
        "inputs": prompt,
        "parameters": {"max_new_tokens": 60, "temperature": 0.8}
    }

    result = query_huggingface_api(TEXT_GEN_MODEL, payload)

    if "error" in result:
        return "An artifact of exquisite darkness, crafted for the discerning." # Fallback

    return result[0].get('generated_text', "An artifact of exquisite darkness.")
