import cv2
import numpy as np
import os

out_dir = r"c:\Users\aqibk\Drun\public\assets"
os.makedirs(out_dir, exist_ok=True)

# 1. Extract the cinematic desert landscape from frame_02s
frame_02 = cv2.imread(r"C:\Users\aqibk\.gemini\antigravity-ide\brain\3f718218-7a1c-43e6-aa81-ff9d4193fdea\reference_frames\frame_02s.jpg")
if frame_02 is not None:
    # Crop the inner website container: notice the reference video shows the web canvas centered
    # Let's find the inner container boundary or save the full frame
    h, w, _ = frame_02.shape
    # Inner viewport is approximately centered rounded rect
    # Let's save a clean background
    cv2.imwrite(os.path.join(out_dir, "hero_bg_full.jpg"), frame_02)
    print("Saved hero_bg_full.jpg")

# 2. Extract the artisan / heritage photos from frame_50s
frame_50 = cv2.imread(r"C:\Users\aqibk\.gemini\antigravity-ide\brain\3f718218-7a1c-43e6-aa81-ff9d4193fdea\reference_frames\frame_50s.jpg")
if frame_50 is not None:
    cv2.imwrite(os.path.join(out_dir, "heritage_ref.jpg"), frame_50)
    print("Saved heritage_ref.jpg")

# 3. Extract the arch texture from frame_32s
frame_32 = cv2.imread(r"C:\Users\aqibk\.gemini\antigravity-ide\brain\3f718218-7a1c-43e6-aa81-ff9d4193fdea\reference_frames\frame_32s.jpg")
if frame_32 is not None:
    cv2.imwrite(os.path.join(out_dir, "arch_transition.jpg"), frame_32)
    print("Saved arch_transition.jpg")

print("Asset preparation complete.")
