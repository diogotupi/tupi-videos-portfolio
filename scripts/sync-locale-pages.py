from pathlib import Path

root = Path(r"c:\Users\diogo\OneDrive\Documents\SITES\tupi-videos-portfolio")
src = (root / "index.html").read_text(encoding="utf-8")
for loc, lang in [("es", "es"), ("pt", "pt-BR")]:
    d = root / loc
    d.mkdir(exist_ok=True)
    html = src.replace('<html lang="en">', f'<html lang="{lang}">', 1)
    inject = f'    <script>window.__LOCALE__="{loc}";</script>\n'
    html = html.replace("  <head>\n", "  <head>\n" + inject, 1)
    (d / "index.html").write_text(html, encoding="utf-8")
    print("wrote", d / "index.html")
