import re
from collections import Counter

p = "appointments-scrape.html"
with open(p, encoding="utf-8", errors="ignore") as f:
    t = f.read()

widgets = re.findall(r'class="widget widget-([^"]+)"', t)
print("widgets:", Counter(widgets).most_common(15))

for m in re.finditer(r'data-aid="HTML_SECTION_TITLE_RENDERED"[^>]*>([^<]+)', t):
    print("H2:", m.group(1).strip()[:100])

for m in re.finditer(r'<h1[^>]*>([^<]+)', t):
    print("H1:", m.group(1).strip()[:100])

idx = t.find("widget-footer")
chunk = t[:idx] if idx > 0 else t
for u in re.findall(r'<iframe[^>]+src="([^"]+)"', chunk):
    ul = u.lower()
    if "youtube" not in ul and "google" not in ul:
        print("iframe:", u[:200])

for m in re.finditer(r"https?://[^\s\"'<>]+", chunk):
    u = m.group()
    ul = u.lower()
    if any(k in ul for k in ("book", "appointment", "ola", "schedule")):
        print("url:", u[:150])

# widget id for appointments content
for wid in re.findall(r'id="([a-f0-9-]{36})" class="widget widget-([^"]+)"', chunk):
    print("widget:", wid[1], wid[0])
