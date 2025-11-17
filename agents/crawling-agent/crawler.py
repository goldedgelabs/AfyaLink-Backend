import requests
from memory_manager import save_global

def crawl_website(url):
    try:
        r = requests.get(url)
        save_global(r.text)
    except Exception as e:
        print("Crawl error:", e)
