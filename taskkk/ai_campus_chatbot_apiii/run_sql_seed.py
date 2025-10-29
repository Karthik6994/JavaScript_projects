import sqlite3
import os
import database

DB_PATH = os.path.join(os.path.dirname(__file__), 'database.db')
SQL_FILE = os.path.join(os.path.dirname(__file__), 'seed_sql.sql')

def run_seed():
    # ensure tables exist
    database.init_db()
    if not os.path.exists(DB_PATH):
        print('database.db not found after init_db() — check permissions')
    with sqlite3.connect(DB_PATH) as conn:
        with open(SQL_FILE, 'r', encoding='utf-8') as f:
            sql = f.read()
        # sqlite3 executes single statements separated by semicolons, use executescript
        conn.executescript(sql)
        conn.commit()
    print('Seed SQL executed — sample courses inserted.')

if __name__ == '__main__':
    run_seed()
