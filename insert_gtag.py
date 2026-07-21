from pathlib import Path

tag_snippet = '''  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-V02TP7P01Z"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-V02TP7P01Z');
  </script>'''

root = Path('.')
html_files = list(root.rglob('*.html'))
updated = []
for path in html_files:
    text = path.read_text(encoding='utf-8')
    if '<head>' in text and 'G-V02TP7P01Z' not in text:
        new_text = text.replace('<head>', '<head>\n' + tag_snippet, 1)
        path.write_text(new_text, encoding='utf-8')
        updated.append(path)

print(f'Updated {len(updated)} files:')
for path in updated:
    print(path)
