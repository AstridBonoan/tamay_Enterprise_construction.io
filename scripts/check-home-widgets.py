import re
from collections import Counter

t = open("home-scrape.html", encoding="utf-8", errors="ignore").read()
print("appointments widget:", "widget-appointments" in t)
widgets = re.findall(r'class="widget widget-([^"]+)"', t)
print(Counter(widgets).most_common(30))
for m in re.finditer(r">([^<]{5,80})<", t):
    tx = m.group(1).strip()
    if "appointment" in tx.lower() or "schedule" in tx.lower():
        print("text:", tx)
