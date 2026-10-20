"""Builds the app icon, adaptive icon layers, splash mark and favicon in assets/.

The mark is a die face showing three: a random pick, with one steel-blue pip for the idea you land on.
"""
import pathlib

from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

INK = "#1F2A37"
PAPER = "#F7F6F3"
STEEL = "#2B5C8A"
SCALE = 4


def mark(size: int, face: str, pip: str, accent: str, background: str | None, coverage: float) -> Image.Image:
    big = size * SCALE
    img = Image.new("RGBA", (big, big), background or (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    side = big * coverage
    left = (big - side) / 2
    top = (big - side) / 2
    draw.rounded_rectangle((left, top, left + side, top + side), radius=side * 0.22, fill=face)

    radius = side * 0.095
    positions = [(0.28, 0.28, pip), (0.5, 0.5, pip), (0.72, 0.72, accent)]
    for fx, fy, colour in positions:
        cx, cy = left + side * fx, top + side * fy
        draw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=colour)
    return img.resize((size, size), Image.LANCZOS)


def save(img: Image.Image, name: str, rgb: bool = False) -> None:
    (img.convert("RGB") if rgb else img).save(ASSETS / name, optimize=True)


def main() -> None:
    save(mark(1024, PAPER, INK, STEEL, INK, 0.58), "icon.png", rgb=True)
    save(mark(1024, PAPER, INK, STEEL, None, 0.42), "android-icon-foreground.png")
    save(Image.new("RGBA", (1024, 1024), INK), "android-icon-background.png")
    save(mark(1024, "#FFFFFF", (0, 0, 0, 0), (0, 0, 0, 0), None, 0.42), "android-icon-monochrome.png")
    save(mark(1024, INK, PAPER, "#8DB3D9", None, 0.9), "splash-icon.png")
    save(mark(1024, PAPER, INK, STEEL, None, 0.9), "splash-icon-dark.png")
    save(mark(48, PAPER, INK, STEEL, INK, 0.8), "favicon.png")


if __name__ == "__main__":
    main()
