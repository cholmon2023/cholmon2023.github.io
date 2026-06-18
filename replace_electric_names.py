from pathlib import Path
import re

root = Path('E:/HunnuStone Site/products/electric')
replacements = {
    'HS-E100': 'DJ650',
    'HS-E200': 'DJ1000',
    'HS-E300': 'DJ1200',
    'HS-E500': 'DJ1500',
    'HS-E800': 'DJ800',
}
updated = []
for path in root.glob('*.html'):
    text = path.read_text(encoding='utf-8')
    new_text = text
    for old, new in replacements.items():
        new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        updated.append(str(path))
print('UPDATED', len(updated))
for p in updated:
    print(p)
