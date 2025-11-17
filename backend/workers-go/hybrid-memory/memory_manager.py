import sqlite3
import time
import os
from pymongo import MongoClient

# Local SQLite fallback
SQLITE_DB = "sqlite_memory.db"
sqlite_conn = sqlite3.connect(SQLITE_DB)
sqlite_cursor = sqlite_conn.cursor()
sqlite_cursor.execute('''
CREATE TABLE IF NOT EXISTS memory (
    key TEXT PRIMARY KEY,
    value TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')
sqlite_conn.commit()

# MongoDB for persistent logs and AI memory
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)
db = client['neuroedge']
memory_collection = db['memory']

class MemoryManager:
    def __init__(self):
        print("[NeuroEdge] Memory Manager initialized")

    def store_memory(self, key, value):
        # Store in SQLite (offline fallback)
        sqlite_cursor.execute('REPLACE INTO memory (key, value) VALUES (?, ?)', (key, value))
        sqlite_conn.commit()

        # Store in MongoDB
        memory_collection.update_one({"key": key}, {"$set": {"value": value}}, upsert=True)
        print(f"[NeuroEdge] Memory stored: {key} -> {value}")

    def get_memory(self, key):
        # Try MongoDB first
        result = memory_collection.find_one({"key": key})
        if result:
            return result['value']
        # Fallback to SQLite
        sqlite_cursor.execute('SELECT value FROM memory WHERE key=?', (key,))
        row = sqlite_cursor.fetchone()
        if row:
            return row[0]
        return None

if __name__ == "__main__":
    mm = MemoryManager()
    mm.store_memory("last_meeting", "Investor call at 10AM")
    print(mm.get_memory("last_meeting"))
