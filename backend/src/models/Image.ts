import db from "../db/db";

const Image = {
  create: (name: string, path: string) => {
    const insert = db.prepare(`
            INSERT INTO images (name, path) 
            VALUES (?, ?)
          `);
    const result = insert.run(name, path);
    return result.lastInsertRowid;
  },
  getAll: () => {
    return db.prepare("SELECT * FROM images").all() || [];
  },
  getImageById: (id: number) => {
    return db.prepare("SELECT * FROM images WHERE id = ?").get(id) || null;
  },
  edit: (name: string, id: number) => {
    const updateImage = db.prepare(`UPDATE images SET name = ?  WHERE id = ?`);
    const result = updateImage.run(name, id);
    return result.changes > 0;
  },
  delete: (id: number) => {
    const statment = db.prepare("DELETE FROM images WHERE id = ?");
    const result = statment.run(id);
    return result.changes > 0;
  },
};

export default Image;
