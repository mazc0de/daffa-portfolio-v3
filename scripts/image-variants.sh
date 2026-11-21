#!/bin/sh
# Smaller copies of the large photos for srcset (phones download these instead of the 1600px originals),
# plus a 1200×630 JPEG per project for link previews (og:image on /work/<slug>).
# Needs cwebp + dwebp (brew install webp) and macOS sips. Re-run after replacing an image in public/images/work or public/images/me.
set -e
cd "$(dirname "$0")/../public/images"
mkdir -p og
for f in work/*.webp; do
  case "$f" in *-640.webp|*-1024.webp) continue ;; esac
  for w in 640 1024; do cwebp -quiet -q 80 -resize "$w" 0 "$f" -o "${f%.webp}-$w.webp"; done
  # scale to 1200 wide, keep the top 630px (nav and headline live there), save as JPEG
  og="og/$(basename "${f%.webp}")"
  cwebp -quiet -q 100 -resize 1200 0 "$f" -o "$og.tmp.webp"
  cwebp -quiet -q 100 -crop 0 0 1200 630 "$og.tmp.webp" -o "$og.tmp.webp"
  dwebp -quiet "$og.tmp.webp" -o "$og.tmp.png"
  sips -s format jpeg -s formatOptions 82 "$og.tmp.png" --out "$og.jpg" >/dev/null
  rm "$og.tmp.webp" "$og.tmp.png"
done
cwebp -quiet -q 80 -resize 480 0 me/daffa.webp -o me/daffa-480.webp
