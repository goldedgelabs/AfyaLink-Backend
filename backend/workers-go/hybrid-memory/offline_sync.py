import time
from memory_manager import MemoryManager

mm = MemoryManager()

def offline_sync():
    print("[NeuroEdge] Starting offline memory sync...")
    while True:
        # Sync any cached data to central database
        print("[NeuroEdge] Syncing offline memory...")
        time.sleep(30)

if __name__ == "__main__":
    offline_sync()
