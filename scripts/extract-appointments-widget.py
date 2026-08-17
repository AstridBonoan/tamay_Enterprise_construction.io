import re
import html as html_lib

p = "appointments-scrape.html"
with open(p, encoding="utf-8", errors="ignore") as f:
    t = f.read()

wid = "4aea0f42-24ce-424a-8573-c6db0bc47b6e"
start = t.find(wid)
end = t.find("2380d2b9-b170-413a-8874-2ffcc9b80656", start)
chunk = t[start:end] if start >= 0 else ""

# strip scripts
chunk = re.sub(r"<script[\s\S]*?</script>", "", chunk, flags=re.I)

texts = re.findall(r">([^<>]{2,120})<", chunk)
seen = set()
for tx in texts:
    tx = html_lib.unescape(tx.strip())
    if not tx or tx in seen:
        continue
    if tx.startswith("c1-") or tx.startswith("x-el"):
        continue
    seen.add(tx)
    print(tx)

print("\n--- data-aid ---")
for m in re.finditer(r'data-aid="([^"]+)"', chunk):
    print(m.group(1))

print("\n--- buttons/links ---")
for m in re.finditer(r'href="([^"]+)"[^>]*>([^<]{2,60})', chunk):
    print(m.group(2).strip(), "->", m.group(1)[:80])
