---
name: media-pipeline-ffmpeg
description: Universal video and audio processing workflows using FFmpeg, audio ducking, subtitle burning, hardware acceleration, and resolution scaling.
---

# Universal Media Processing Pipeline with FFmpeg

This skill provides production-grade FFmpeg workflows for encoding, audio ducking, subtitle burning, resolution scaling, and lossless concatenation.

---

## 1. High-Performance Video Encoding

- **Standard CPU Encoding (H.264/CRF 18 - Visual Lossless)**:
  ```bash
  ffmpeg -y -i input.mp4 -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k output.mp4
  ```
- **NVIDIA GPU Acceleration (NVENC)**:
  ```bash
  ffmpeg -y -i input.mp4 -c:v h264_nvenc -preset p6 -cq 19 -c:a aac -b:a 192k output.mp4
  ```

---

## 2. Audio Ducking (Auto-lower BGM when Voiceover speaks)

Automatically attenuate the background music volume whenever voiceover audio is active using `sidechaincompress`:

```bash
ffmpeg -y -i voiceover.mp3 -i background_music.mp3 -filter_complex \
"[1:a]volume=0.4[bg]; \
 [bg][0:a]sidechaincompress=threshold=0.08:ratio=4:attack=50:release=300[ducked]; \
 [0:a][ducked]amix=inputs=2:duration=first[aout]" \
-map "[aout]" -c:a aac -b:a 192k mixed_audio.mp3
```

---

## 3. Subtitle Burning (Hardcoded Subtitles)

Burn `.srt` subtitles into video with customized font, size, and background box:

```bash
ffmpeg -y -i input.mp4 -vf "subtitles=sub.srt:force_style='FontName=Plus Jakarta Sans,FontSize=18,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=3,MarginV=35'" -c:a copy output.mp4
```

---

## 4. Convert Horizontal (16:9) to Vertical Video (9:16 Shorts/Reels)

Crop and center video for TikTok, YouTube Shorts, and Instagram Reels:

```bash
ffmpeg -y -i landscape.mp4 -vf "crop=ih*(9/16):ih,scale=1080:1920" -c:v libx264 -crf 20 -c:a copy vertical.mp4
```

Or blurred background style (original video centered with blurred background fill):
```bash
ffmpeg -y -i landscape.mp4 -filter_complex \
"[0:v]scale=1080:1920:force_original_aspect_ratio=increase,boxblur=20:5[bg]; \
 [0:v]scale=1080:1920:force_original_aspect_ratio=decrease[fg]; \
 [bg][fg]overlay=(W-w)/2:(H-h)/2" \
-c:v libx264 -c:a copy vertical_blurred.mp4
```

---

## 5. Lossless Concatenation (Zero Re-encoding)

Concatenate multiple clips with matching codecs instantly:

```bash
# file_list.txt:
# file 'part1.mp4'
# file 'part2.mp4'
ffmpeg -y -f concat -safe 0 -i file_list.txt -c copy final_video.mp4
```
