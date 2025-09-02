# NOTE: This is the main orchestrator for the marketing agent.
# It uses the other placeholder modules to simulate the full workflow.

from . import trend_analyzer
from . import content_generator
from . import social_media_publisher

def run_marketing_for_new_product(product: dict):
    """
    The main function that orchestrates the marketing for a new product.
    """
    print(f"\n--- MARKETING AGENT: Starting campaign for {product['name']} ---")

    # 1. Analyze trends
    print("\n[Step 1: Analyzing Trends]")
    insta_hashtags = trend_analyzer.get_trending_hashtags('instagram')
    tiktok_hashtags = trend_analyzer.get_trending_hashtags('tiktok')
    trending_sound = trend_analyzer.get_trending_sound('tiktok') # Assume we use the same sound for both

    insta_trends = {'hashtags': insta_hashtags, 'sound': trending_sound}
    tiktok_trends = {'hashtags': tiktok_hashtags, 'sound': trending_sound}

    # 2. Generate content
    print("\n[Step 2: Generating Content]")
    # For Instagram, we'll generate a video storyboard.
    video_storyboard = content_generator.generate_video_post(product, insta_trends)
    insta_caption = content_generator.generate_poetic_caption(product, insta_trends)

    # For TikTok, we can reuse the same storyboard but might use different trends/captions
    tiktok_caption = content_generator.generate_poetic_caption(product, tiktok_trends)

    # 3. Publish content
    print("\n[Step 3: Publishing to Social Media]")
    social_media_publisher.post_to_instagram(caption=insta_caption, video_storyboard=video_storyboard)
    print("---")
    social_media_publisher.post_to_tiktok(caption=tiktok_caption, video_storyboard=video_storyboard)

    print(f"\n--- MARKETING AGENT: Campaign for {product['name']} complete. ---\n")
