import sqlite3
from pymongo import MongoClient

# SQLite for local fallback
local_conn = sqlite3.connect('database/sqlite/local_memory.db')

# MongoDB for global AI memory
client = MongoClient("mongodb://localhost:27017/")
db = client['neuroedge_ai_memory']

def save_local(data):
    cursor = local_conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS memory (id INTEGER PRIMARY KEY, content TEXT)")
    cursor.execute("INSERT INTO memory (content) VALUES (?)", (data,))
    local_conn.commit()

def save_global(data):
    db.memory.insert_one({"content": data})
