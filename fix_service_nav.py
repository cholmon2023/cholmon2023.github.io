from pathlib import Path
import re

root = Path('E:/HunnuStone Site')
scene_pattern = re.compile(r'(<a href="(?P<prefix>(?:\.\./){0,2}index\.html|#)#scene">Хэрэглээ</a>)')
service_bad_pattern = re.compile(r'<a href="(?P<prefix>(?:\.\./){0,2}index\.html)">(?P<label>үйлчилгээ|service)</a>')
updated_files = []

for path in root.rglob('*.html'):
    text = path.read_text(encoding='utf-8')
    new_text = text

    def insert_service(match):
        prefix = match.group('prefix')
        if prefix == '#':
            return f'{match.group(1)}\n      <a href="#service">үйлчилгээ</a>'
        return f'{match.group(1)}\n      <a href="{prefix}#service">үйлчилгээ</a>'

    new_text = scene_pattern.sub(insert_service, new_text)
    new_text = service_bad_pattern.sub(r'<a href="\g<prefix>#service">\g<label></a>', new_text)

    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        updated_files.append(str(path))

print('UPDATED', len(updated_files))
for f in updated_files:
    print(f)
