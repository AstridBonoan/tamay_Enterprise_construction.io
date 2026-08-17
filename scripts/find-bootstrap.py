import re

t = open("appointments-scrape.html", encoding="utf-8", errors="ignore").read()
# Godaddy often uses data-cookie or bootstrap in script type application/json
for m in re.finditer(r'<script[^>]*type="application/json"[^>]*>([^<]{100,5000})</script>', t):
    body = m.group(1)
    if "appointment" in body.lower() or "ola" in body.lower() or "93698" in body:
        print(body[:2000])
        print("---")

# search page id
for pat in ["page-93698", "bs-7", "appointments-2", "03703029"]:
    i = 0
    count = 0
    while count < 3:
        i = t.find(pat, i)
        if i < 0:
            break
        print(pat, ":", t[i : i + 300].replace("\n", " ")[:300])
        print("---")
        i += len(pat)
        count += 1
