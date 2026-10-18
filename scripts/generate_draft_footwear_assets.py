import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUTPUT_DIR = r"c:\Users\aqibk\Drun\public\products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 24 Products metadata for asset generation
PRODUCTS_DATA = [
    # Classic Peshawari (6)
    {"id": "drun-06", "slug": "traditional-saddle-brown", "style": "classic", "color": "#7B3F00", "title": "Traditional Saddle Brown", "leather": "Full-Grain Veg-Tan"},
    {"id": "drun-07", "slug": "classic-noir-formal", "style": "classic", "color": "#181818", "title": "Classic Noir Formal", "leather": "Aniline Glazed Calfskin"},
    {"id": "drun-08", "slug": "dark-chocolate-bark", "style": "classic", "color": "#3D2314", "title": "Dark Chocolate Bark", "leather": "Pull-Up Cowhide"},
    {"id": "drun-09", "slug": "artisan-tan-minimalist", "style": "classic", "color": "#C18A49", "title": "Artisan Tan Minimalist", "leather": "Raw-Grain Crust"},
    {"id": "drun-10", "slug": "charsadda-heritage-ochre", "style": "classic", "color": "#A0522D", "title": "Charsadda Heritage Ochre", "leather": "Drum-Dyed Bovine"},
    {"id": "drun-11", "slug": "governor-formal-burnished", "style": "classic", "color": "#4A150D", "title": "Governor Formal Burnished", "leather": "Hand-Patinated Calf"},

    # Kaptaan Style (6)
    {"id": "drun-12", "slug": "kaptaan-rustique-brown", "style": "kaptaan", "color": "#5C3317", "title": "Kaptaan Rustique Brown", "leather": "Heavy Veg-Tan Bovine"},
    {"id": "drun-13", "slug": "kaptaan-midnight-shadow", "style": "kaptaan", "color": "#111111", "title": "Kaptaan Midnight Shadow", "leather": "Milled Top-Grain"},
    {"id": "drun-14", "slug": "kaptaan-desert-sand-tan", "style": "kaptaan", "color": "#B38B59", "title": "Kaptaan Desert Sand Tan", "leather": "Oil Pull-Up Cowhide"},
    {"id": "drun-15", "slug": "kaptaan-textured-granary", "style": "kaptaan", "color": "#4E3629", "title": "Kaptaan Textured Granary", "leather": "Scotch-Grain Bovine"},
    {"id": "drun-16", "slug": "kaptaan-dark-chocolate", "style": "kaptaan", "color": "#2E1810", "title": "Kaptaan Dark Chocolate", "leather": "Deep-Waxed Pull-Up"},
    {"id": "drun-17", "slug": "kaptaan-imperial-stitched", "style": "kaptaan", "color": "#421217", "title": "Kaptaan Imperial Stitched", "leather": "Glazed Cordovan Calf"},

    # Norozi Style (6)
    {"id": "drun-18", "slug": "quetta-norozi-chestnut", "style": "norozi", "color": "#8B4513", "title": "Quetta Norozi Chestnut", "leather": "3mm Heavy Bovine Hide"},
    {"id": "drun-19", "slug": "norozi-onyx-shadow", "style": "norozi", "color": "#161616", "title": "Norozi Onyx Shadow", "leather": "Full-Grain Steerhide"},
    {"id": "drun-20", "slug": "norozi-camel-suede", "style": "norozi", "color": "#C29B68", "title": "Norozi Camel Suede", "leather": "Roughout Desert Suede"},
    {"id": "drun-21", "slug": "norozi-oxblood-saddle", "style": "norozi", "color": "#5B1E1E", "title": "Norozi Oxblood Saddle", "leather": "Oil-Tanned Pull-Up"},
    {"id": "drun-22", "slug": "norozi-raw-tyre-welt-espresso", "style": "norozi", "color": "#2A1810", "title": "Norozi Raw Tyre-Welt Espresso", "leather": "Crust Cowhide"},
    {"id": "drun-23", "slug": "norozi-ceremonial-brass", "style": "norozi", "color": "#6B3410", "title": "Norozi Ceremonial Brass", "leather": "European Calfskin"},

    # Modern & Signature (6)
    {"id": "drun-24", "slug": "modern-charsadda-slate", "style": "modern", "color": "#353839", "title": "Modern Charsadda Slate", "leather": "Matte Velour Nubuck"},
    {"id": "drun-25", "slug": "dual-tone-cognac-charcoal", "style": "modern", "color": "#8B4513", "title": "Dual-Tone Cognac & Charcoal", "leather": "Cognac & Bridle Slate"},
    {"id": "drun-26", "slug": "minimalist-monolith-tan", "style": "modern", "color": "#C49B71", "title": "Minimalist Monolith Tan", "leather": "Unlined Italian Calf"},
    {"id": "drun-27", "slug": "urban-slipstream-black", "style": "modern", "color": "#121212", "title": "Urban Slipstream Black", "leather": "Micro-Grain Nappa"},
    {"id": "drun-28", "slug": "heritage-olive-nubuck", "style": "modern", "color": "#555D50", "title": "Heritage Olive Nubuck", "leather": "Brushed Velour Nubuck"},
    {"id": "drun-29", "slug": "signature-gala-velvet-calf", "style": "modern", "color": "#1B263B", "title": "Signature Gala Velvet & Calf", "leather": "Italian Velvet & Patent"}
]

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def render_footwear_silhouette(width, height, p_data, angle_idx=0):
    # Base transparent canvas
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    rgb = hex_to_rgb(p_data["color"])
    style = p_data["style"]
    
    # Coordinates & bounding box
    cx, cy = width // 2, int(height * 0.48)
    scale_x = width * 0.38
    scale_y = height * 0.26
    
    # Draw soft realistic drop shadow below shoe
    shadow_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    shadow_box = [cx - int(scale_x * 0.85), cy + int(scale_y * 0.65), cx + int(scale_x * 0.85), cy + int(scale_y * 0.95)]
    s_draw.ellipse(shadow_box, fill=(0, 0, 0, 110))
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(25))
    img.paste(shadow_img, (0, 0), shadow_img)
    
    # Draw Sole / Tyre Welt Layer
    sole_points = []
    if style == "kaptaan":
        # Square toe profile
        sole_points = [
            (cx - int(scale_x * 0.82), cy + int(scale_y * 0.45)), # heel
            (cx - int(scale_x * 0.70), cy + int(scale_y * 0.58)),
            (cx - int(scale_x * 0.20), cy + int(scale_y * 0.62)), # arch
            (cx + int(scale_x * 0.45), cy + int(scale_y * 0.68)), # ball
            (cx + int(scale_x * 0.82), cy + int(scale_y * 0.64)), # front square low
            (cx + int(scale_x * 0.85), cy + int(scale_y * 0.42)), # front square high
            (cx + int(scale_x * 0.78), cy + int(scale_y * 0.32)),
            (cx + int(scale_x * 0.40), cy + int(scale_y * 0.38)),
            (cx - int(scale_x * 0.15), cy + int(scale_y * 0.32)),
            (cx - int(scale_x * 0.65), cy + int(scale_y * 0.25)),
            (cx - int(scale_x * 0.80), cy + int(scale_y * 0.30)),
        ]
    elif style == "norozi":
        # Sweeping heavy curved welt
        sole_points = [
            (cx - int(scale_x * 0.80), cy + int(scale_y * 0.40)),
            (cx - int(scale_x * 0.65), cy + int(scale_y * 0.55)),
            (cx - int(scale_x * 0.10), cy + int(scale_y * 0.60)),
            (cx + int(scale_x * 0.50), cy + int(scale_y * 0.65)),
            (cx + int(scale_x * 0.84), cy + int(scale_y * 0.48)),
            (cx + int(scale_x * 0.80), cy + int(scale_y * 0.30)),
            (cx + int(scale_x * 0.35), cy + int(scale_y * 0.32)),
            (cx - int(scale_x * 0.20), cy + int(scale_y * 0.26)),
            (cx - int(scale_x * 0.72), cy + int(scale_y * 0.22)),
        ]
    else: # Classic & Modern
        sole_points = [
            (cx - int(scale_x * 0.80), cy + int(scale_y * 0.40)),
            (cx - int(scale_x * 0.60), cy + int(scale_y * 0.52)),
            (cx - int(scale_x * 0.15), cy + int(scale_y * 0.56)),
            (cx + int(scale_x * 0.45), cy + int(scale_y * 0.60)),
            (cx + int(scale_x * 0.82), cy + int(scale_y * 0.45)),
            (cx + int(scale_x * 0.75), cy + int(scale_y * 0.28)),
            (cx + int(scale_x * 0.30), cy + int(scale_y * 0.32)),
            (cx - int(scale_x * 0.20), cy + int(scale_y * 0.26)),
            (cx - int(scale_x * 0.70), cy + int(scale_y * 0.24)),
        ]
        
    sole_color = (25, 27, 26, 255)
    draw.polygon(sole_points, fill=sole_color)
    
    # Welt edge line (brass/linen stitch)
    for i in range(len(sole_points) - 1):
        p1 = sole_points[i]
        p2 = sole_points[i+1]
        draw.line([p1, p2], fill=(216, 137, 85, 200), width=3)
        
    # Main Leather Footbed & Instep Wings (Upper)
    # Upper primary curve
    upper_color = (rgb[0], rgb[1], rgb[2], 255)
    # Leather shading highlight
    h_rgb = (min(255, rgb[0] + 40), min(255, rgb[1] + 35), min(255, rgb[2] + 25), 255)
    d_rgb = (max(0, rgb[0] - 35), max(0, rgb[1] - 30), max(0, rgb[2] - 25), 255)
    
    if style == "kaptaan":
        # Overlapping instep wings
        wing1 = [
            (cx - int(scale_x * 0.30), cy - int(scale_y * 0.25)),
            (cx + int(scale_x * 0.35), cy - int(scale_y * 0.35)),
            (cx + int(scale_x * 0.65), cy + int(scale_y * 0.30)),
            (cx + int(scale_x * 0.20), cy + int(scale_y * 0.45)),
            (cx - int(scale_x * 0.25), cy + int(scale_y * 0.20)),
        ]
        wing2 = [
            (cx - int(scale_x * 0.10), cy - int(scale_y * 0.40)),
            (cx + int(scale_x * 0.55), cy - int(scale_y * 0.15)),
            (cx + int(scale_x * 0.72), cy + int(scale_y * 0.35)),
            (cx + int(scale_x * 0.30), cy + int(scale_y * 0.50)),
            (cx - int(scale_x * 0.05), cy + int(scale_y * 0.15)),
        ]
        draw.polygon(wing1, fill=upper_color)
        draw.polygon(wing2, fill=h_rgb)
        # Antique brass insignia rivet
        draw.ellipse([cx + int(scale_x * 0.15) - 8, cy - int(scale_y * 0.10) - 8, cx + int(scale_x * 0.15) + 8, cy - int(scale_y * 0.10) + 8], fill=(218, 165, 32, 240), outline=(139, 90, 0, 255))
    elif style == "norozi":
        # Heavy curved bridge strap
        bridge = [
            (cx - int(scale_x * 0.35), cy - int(scale_y * 0.15)),
            (cx + int(scale_x * 0.30), cy - int(scale_y * 0.30)),
            (cx + int(scale_x * 0.68), cy + int(scale_y * 0.25)),
            (cx + int(scale_x * 0.30), cy + int(scale_y * 0.45)),
            (cx - int(scale_x * 0.25), cy + int(scale_y * 0.25)),
        ]
        draw.polygon(bridge, fill=upper_color)
        # Double stitch detailing
        for offset in [-3, 3]:
            pts = [(p[0], p[1] + offset) for p in bridge]
            for j in range(len(pts) - 1):
                draw.line([pts[j], pts[j+1]], fill=(250, 157, 96, 180), width=2)
    else: # Classic and Modern
        strap = [
            (cx - int(scale_x * 0.25), cy - int(scale_y * 0.20)),
            (cx + int(scale_x * 0.40), cy - int(scale_y * 0.28)),
            (cx + int(scale_x * 0.70), cy + int(scale_y * 0.32)),
            (cx + int(scale_x * 0.25), cy + int(scale_y * 0.42)),
            (cx - int(scale_x * 0.15), cy + int(scale_y * 0.18)),
        ]
        draw.polygon(strap, fill=upper_color)
        # Brass roller buckle
        buckle = [cx - int(scale_x * 0.12), cy - int(scale_y * 0.15), cx - int(scale_x * 0.02), cy + int(scale_y * 0.05)]
        draw.rectangle(buckle, outline=(218, 165, 32, 230), width=3)

    # Heel Counter Strap
    heel_strap = [
        (cx - int(scale_x * 0.75), cy + int(scale_y * 0.22)),
        (cx - int(scale_x * 0.55), cy - int(scale_y * 0.05)),
        (cx - int(scale_x * 0.35), cy + int(scale_y * 0.15)),
        (cx - int(scale_x * 0.55), cy + int(scale_y * 0.35)),
    ]
    draw.polygon(heel_strap, fill=d_rgb)
    
    # Elegant Studio Tag Overlay
    # Draw refined luxury label at bottom
    tag_bg = [cx - 240, height - 70, cx + 240, height - 25]
    draw.rounded_rectangle(tag_bg, radius=12, fill=(7, 16, 14, 230), outline=(255, 255, 255, 35), width=1)
    
    angle_labels = ["BENCH ANGLE: 3/4 PROFILE", "SIDE SILHOUETTE VIEW", "TOP GRAIN PROFILE"]
    angle_text = angle_labels[angle_idx % len(angle_labels)]
    
    # Draw text cleanly
    draw.text((cx, height - 56), f"DRUN. ATELIER DRAFT • {p_data['id'].upper()}", fill=(250, 157, 96, 255), anchor="ms")
    draw.text((cx, height - 35), f"{angle_text} • AWAITING STUDIO SHOOT", fill=(158, 170, 164, 255), anchor="ms")
    
    return img

print("Generating 24 product images with multi-angle galleries...")
for p in PRODUCTS_DATA:
    # 1. Main image: 3/4 angle
    main_img = render_footwear_silhouette(1200, 900, p, angle_idx=0)
    main_path = os.path.join(OUTPUT_DIR, f"{p['slug']}.png")
    main_img.save(main_path, "PNG", optimize=True)
    
    # 2. Side profile angle
    side_img = render_footwear_silhouette(1200, 900, p, angle_idx=1)
    side_path = os.path.join(OUTPUT_DIR, f"{p['slug']}-side.png")
    side_img.save(side_path, "PNG", optimize=True)
    
    # 3. Top view angle
    top_img = render_footwear_silhouette(1200, 900, p, angle_idx=2)
    top_path = os.path.join(OUTPUT_DIR, f"{p['slug']}-top.png")
    top_img.save(top_path, "PNG", optimize=True)

print("All 24 products generated successfully (72 multi-angle image assets created).")
