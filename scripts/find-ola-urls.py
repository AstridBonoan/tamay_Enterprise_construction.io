import re

t = open("appointments-scrape.html", encoding="utf-8", errors="ignore").read()
urls = set(re.findall(r"https?://[a-zA-Z0-9._/?#=&%-]+", t))
for u in sorted(urls):
    ul = u.lower()
    if any(k in ul for k in ("book", "ola", "appoint", "schedule", "calendar", "wsimg.com/ceph")):
        print(u[:200])
