import Database from "better-sqlite3";
import { resolve } from "path";

const dbPath = resolve(__dirname, "images.db");
const db = new Database(dbPath);
db.exec(`
    CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    path TEXT NOT NULL UNIQUE,
    originalPath TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
 `);

db.pragma("journal_mode = WAL");
db.pragma("synchronous = NORMAL");
db.pragma("busy_timeout = 3000");

export default db;
