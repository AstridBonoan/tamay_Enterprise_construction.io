import re

t = open("appointments-scrape.html", encoding="utf-8", errors="ignore").read()
# all isteam image urls
urls = set(re.findall(r"//img1\.wsimg\.com/isteam/[^\"'\s<>]+", t))
for u in sorted(urls)[:40]:
    print(u[:180])
