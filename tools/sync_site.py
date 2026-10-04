"""Copy a reviewed local static site into the GitHub Pages docs directory."""
from pathlib import Path
import hashlib
import json
import shutil
import sys

repo = Path(__file__).resolve().parents[1]
source = Path(sys.argv[1]).resolve()
target = repo / 'docs'
assert (source / 'index.html').is_file()
assert not target.exists(), 'Preserve an existing docs directory; reconcile before resyncing.'
files = sorted(p for p in source.rglob('*') if p.is_file())
before = {p.relative_to(source).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
shutil.copytree(source, target)
for p in files:
    name = p.relative_to(source).as_posix()
    assert hashlib.sha256((target / name).read_bytes()).hexdigest() == before[name]
    assert hashlib.sha256(p.read_bytes()).hexdigest() == before[name], 'Source changed during copy'
(target / '.nojekyll').touch()
(repo / 'SOURCE_SNAPSHOT.json').write_text(json.dumps({'presentation_version': 'v5', 'source_files': before}, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'copied_files': len(files), 'verified': True}))
