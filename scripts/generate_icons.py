"""Generuje rastrowe warianty favicon z geometrii public/favicon.svg.

Użycie: python3 scripts/generate_icons.py   (wymaga Pillow i numpy)
Geometria jest odwzorowana 1:1 z favicon.svg (viewBox 512). Po zmianie SVG
zaktualizuj stałe poniżej i uruchom skrypt ponownie.
"""
import struct, io, pathlib
import numpy as np
from PIL import Image, ImageDraw

OUT = pathlib.Path(__file__).resolve().parent.parent / "public"
SS = 4  # supersampling

def lerp(a, b, t):
    return a + (b - a) * t

def hexrgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float32)

def linear(size, p0, p1, c0, c1, a0=1.0, a1=1.0):
    """Gradient liniowy w układzie 512x512 przeskalowany do `size`."""
    s = size / 512
    ys, xs = np.mgrid[0:size, 0:size].astype(np.float32)
    x0, y0, x1, y1 = p0[0] * s, p0[1] * s, p1[0] * s, p1[1] * s
    d = np.array([x1 - x0, y1 - y0], dtype=np.float32)
    t = ((xs - x0) * d[0] + (ys - y0) * d[1]) / float(d @ d)
    t = np.clip(t, 0, 1)[..., None]
    rgb = hexrgb(c0) * (1 - t) + hexrgb(c1) * t
    a = (a0 * (1 - t) + a1 * t)
    return np.concatenate([rgb, a * 255], axis=-1)

def radial(size, c, r, color, a0):
    s = size / 512
    ys, xs = np.mgrid[0:size, 0:size].astype(np.float32)
    t = np.clip(np.hypot(xs - c[0] * s, ys - c[1] * s) / (r * s), 0, 1)
    a = (a0 * (1 - t) * 255)[..., None]
    rgb = np.broadcast_to(hexrgb(color), (size, size, 3))
    return np.concatenate([rgb, a], axis=-1)

def img(arr):
    return Image.fromarray(arr.astype(np.uint8), "RGBA")

def stroke_path(draw, pts, width, fill, round_join=True):
    draw.line(pts, fill=fill, width=width, joint="curve" if round_join else None)
    r = width / 2
    for x, y in (pts[0], pts[-1]) if not round_join else pts:
        draw.ellipse((x - r, y - r, x + r, y + r), fill=fill)

def render(px, mode="icon"):
    """mode: icon (zaokrąglony, przezroczyste rogi), full (pełne tło), maskable (pełne tło + strefa bezpieczna)."""
    size = px * SS
    s = size / 512
    base = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pad = 32 if mode == "icon" else 0
    box = (pad * s, pad * s, (512 - pad) * s, (512 - pad) * s)
    mask = Image.new("L", (size, size), 0)
    radius = 112 * s if mode == "icon" else 0
    ImageDraw.Draw(mask).rounded_rectangle(box, radius=radius, fill=255) if radius else ImageDraw.Draw(mask).rectangle(box, fill=255)
    bg = img(linear(size, (96, 32), (416, 480), "#1b232a", "#0b0d0f"))
    glow = img(radial(size, (372, 120), 300, "#acd1e8", 0.34))
    bg.alpha_composite(glow)
    base.paste(bg, (0, 0), mask)
    if mode == "icon":
        ring = img(linear(size, (64, 40), (448, 472), "#d9edf8", "#acd1e8", 0.55, 0.3))
        ring_mask = Image.new("L", (size, size), 0)
        d = ImageDraw.Draw(ring_mask)
        d.rounded_rectangle((35 * s, 35 * s, 477 * s, 477 * s), radius=109 * s, outline=255, width=max(1, int(6 * s)))
        base.paste(ring, (0, 0), ring_mask)

    # Glif: w trybie maskable skalowany do strefy bezpiecznej (~70%).
    k = 0.70 if mode == "maskable" else 1.0
    def tp(x, y):
        return (256 + (x - 256) * k) * s, (256 + (y - 256) * k) * s
    w = int(46 * k * s)
    glyph_mask = Image.new("L", (size, size), 0)
    gd = ImageDraw.Draw(glyph_mask)
    stroke_path(gd, [tp(158, 172), tp(252, 256), tp(158, 340)], w, 255)
    glyph = img(linear(size, (150, 170), (390, 342), "#f1f8fc", "#8fc0de"))
    base.paste(glyph, (0, 0), glyph_mask)
    bar_mask = Image.new("L", (size, size), 0)
    bd = ImageDraw.Draw(bar_mask)
    stroke_path(bd, [tp(290, 342), tp(386, 342)], w, 255, round_join=False)
    bar = Image.new("RGBA", (size, size), (172, 209, 232, 255))
    base.paste(bar, (0, 0), bar_mask)
    return base.resize((px, px), Image.LANCZOS)

def write_ico(path, sizes):
    frames = []
    for px in sizes:
        buf = io.BytesIO()
        render(px).save(buf, "PNG")
        frames.append((px, buf.getvalue()))
    header = struct.pack("<HHH", 0, 1, len(frames))
    offset = 6 + 16 * len(frames)
    entries, data = b"", b""
    for px, png in frames:
        entries += struct.pack("<BBBBHHII", px % 256, px % 256, 0, 0, 1, 32, len(png), offset + len(data))
        data += png
    path.write_bytes(header + entries + data)

if __name__ == "__main__":
    for px, name in [(16, "favicon-16x16.png"), (32, "favicon-32x32.png"), (48, "favicon-48x48.png"),
                     (192, "android-chrome-192x192.png"), (512, "android-chrome-512x512.png")]:
        render(px).save(OUT / name)
    render(180, "full").convert("RGB").save(OUT / "apple-touch-icon.png")
    render(512, "maskable").save(OUT / "maskable-icon-512x512.png")
    write_ico(OUT / "favicon.ico", [16, 32, 48])
    print("ok")
