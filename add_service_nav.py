from pathlib import Path
import re

root = Path('E:/HunnuStone Site')
pattern = re.compile(r'(<a href="(?P<prefix>(?:\.\./){0,2}index\.html)#scene">Хэрэглээ</a>)')
updated_files = []
for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    if '#scene">Хэрэглээ</a>' in text and '#service">үйлчилгээ</a>' not in text:
        def repl(m):
            prefix = m.group('prefix')
            return f'{m.group(1)}\n      <a href="{prefix.replace("#scene","#service")}">үйлчилгээ</a>'
        new_text = pattern.sub(repl, text)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
            updated_files.append(str(path))
print('UPDATED', len(updated_files))
for f in updated_files:
    print(f)
