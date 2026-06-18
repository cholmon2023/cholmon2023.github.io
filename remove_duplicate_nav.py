from pathlib import Path
import re

root = Path('E:/HunnuStone Site')
updated_files = []

for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    # Remove consecutive duplicate service links
    new_text = re.sub(r'(<a href="[^"]*#service">[^<]*</a>)\s*\1+', r'\1', text)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        updated_files.append(str(path))

print('FIXED', len(updated_files))
for f in updated_files:
    print(f)
