# NOTE: This file is a placeholder for content generation logic.
import sys
import os

# Add the parent directory to the path to allow sibling imports
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from ai_generator import generate_poetic_description

def generate_poetic_caption(product: dict, trends: dict) -> str:
    """
    Generates a poetic caption for a social media post.
    """
    print(f"Generating poetic caption for {product['name']}...")

    # Use the main AI generator to create a base description
    base_description = generate_poetic_description(product['name'])

    # Add hashtags
    hashtags_str = " ".join(trends.get('hashtags', []))

    # Combine them into a final caption
    final_caption = f"{base_description}\n\n" \
                    f"Sound: {trends.get('sound', 'Silent as the grave')}\n" \
                    f"Claim yours from the shadows.\n\n" \
                    f"{hashtags_str}"

    return final_caption

def generate_video_storyboard(product: dict, trends: dict) -> dict:
    """
    Generates a storyboard for a short promotional video.
    This simulates video generation by creating a structured plan.
    """
    print(f"Generating video storyboard for {product['name']}...")

    storyboard = {
        "product_id": product['id'],
        "product_name": product['name'],
        "sound_track": trends.get('sound'),
        "scenes": [
            {
                "scene": 1,
                "type": "static_image",
                "image_url": product['thumbnail_url'],
                "duration_seconds": 2,
                "text_overlay": "From the depths...",
            },
            {
                "scene": 2,
                "type": "zoom_in_image",
                "image_url": product['thumbnail_url'],
                "duration_seconds": 3,
                "text_overlay": f"Behold... The {product['name']}",
            },
            {
                "scene": 3,
                "type": "static_image",
                "image_url": product['thumbnail_url'],
                "duration_seconds": 2,
                "text_overlay": "Available now. Link in bio.",
            }
        ]
    }
    return storyboard

# This function is kept for compatibility with agent.py, but it now
# returns a storyboard (dict) instead of a file path (str).
def generate_video_post(product: dict, trends: dict) -> dict:
    """
    Simulates creating a video post by generating a storyboard.
    """
    return generate_video_storyboard(product, trends)
