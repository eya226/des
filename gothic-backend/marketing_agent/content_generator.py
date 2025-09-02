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

def render_storyboard_to_video(storyboard: dict, output_path: str):
    """
    (This is a non-functional scaffold)
    Renders a storyboard JSON object into a video file using moviepy.

    To make this function work, you would need to:
    1. Ensure `moviepy` and its dependencies (like `ffmpeg`) are installed.
    2. Handle image downloading from URLs.
    3. Have fonts available for the text overlays.
    """
    print(f"--- Video Rendering Scaffold for {output_path} ---")

    # --- THIS CODE IS A NON-RUNNABLE EXAMPLE ---
    # from moviepy.editor import ImageClip, TextClip, CompositeVideoClip, concatenate_videoclips
    # import requests

    # clips = []
    # for scene in storyboard.get('scenes', []):
    #     # Download image for the scene
    #     # image_data = requests.get(scene['image_url']).content
    #     # with open("temp_image.jpg", "wb") as f:
    #     #     f.write(image_data)

    #     image_clip = ImageClip("temp_image.jpg").set_duration(scene['duration_seconds'])

    #     # Create a text clip
    #     text_clip = TextClip(
    #         scene['text_overlay'],
    #         fontsize=70,
    #         color='white',
    #         font='Arial-Bold', # Ensure font is available on the system
    #         stroke_color='black',
    #         stroke_width=2
    #     ).set_position('center').set_duration(scene['duration_seconds'])

    #     # Composite the text over the image
    #     video_clip = CompositeVideoClip([image_clip, text_clip])
    #     clips.append(video_clip)

    # if clips:
    #     final_clip = concatenate_videoclips(clips)
    #     final_clip.write_videofile(output_path, fps=24, codec='libx264')
    #     print(f"Video '{output_path}' rendered successfully (Simulated).")
    # else:
    #     print("No scenes found in storyboard to render.")

    print("--- End of Video Rendering Scaffold ---")
    # In a real implementation, you would return the path or status.
    return True
