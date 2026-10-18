import cv2
import os

video_path = r"C:\Users\aqibk\Downloads\1.mp4"
out_dir = r"C:\Users\aqibk\.gemini\antigravity-ide\brain\3f718218-7a1c-43e6-aa81-ff9d4193fdea\hero_video_frames"
os.makedirs(out_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
duration = total_frames / fps if fps > 0 else 0

print(f"Video resolution: {width}x{height}, FPS: {fps}, Frames: {total_frames}, Duration: {duration:.2f}s")

# Extract 5 evenly spaced frames
for i, step in enumerate([0, 0.25, 0.5, 0.75, 0.95]):
    f_idx = int(total_frames * step)
    cap.set(cv2.CAP_PROP_POS_FRAMES, f_idx)
    ret, frame = cap.read()
    if ret:
        out_file = os.path.join(out_dir, f"frame_{i}.jpg")
        cv2.imwrite(out_file, frame)
        print(f"Saved {out_file} at step {step}")

cap.release()
