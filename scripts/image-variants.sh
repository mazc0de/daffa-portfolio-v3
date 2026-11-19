#!/bin/sh
# Smaller copies of the large photos for srcset (phones download these instead of the 1600px originals).
# Needs cwebp (brew install webp). Re-run after replacing an image in public/images/work or public/images/me.
set -e
cd "$(dirname "$0")/../public/images"
for f in work/*.webp; do
  case "$f" in *-640.webp|*-1024.webp) continue ;; esac
  for w in 640 1024; do cwebp -quiet -q 80 -resize "$w" 0 "$f" -o "${f%.webp}-$w.webp"; done
done
cwebp -quiet -q 80 -resize 480 0 me/daffa.webp -o me/daffa-480.webp
