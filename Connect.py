import sqlite3 as sql

dbCon = sql.connect(r'filmflix.db')

dbCursor = dbCon.cursor()