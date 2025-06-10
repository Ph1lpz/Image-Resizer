import db from "../db/db";

const Image = {
  create: (name: string, path: string, originalPath?: string) => {
    const insert = db.prepare(`
            INSERT INTO images (name, path , originalPath) 
            VALUES (?, ? ,?)
          `);
    const result = insert.run(name, path, originalPath);
    return result.lastInsertRowid;
  },
  getAll: (): IMAGE[] => {
    return (db.prepare("SELECT * FROM images").all() as IMAGE[]) || [];
  },
  getImageById: (id: number): IMAGE => {
    return (
      (db.prepare("SELECT * FROM images WHERE id = ?").get(id) as IMAGE) || null
    );
  },
  countImagesByOriginalPath: (originalPath: string | null) => {
    const result = db
      .prepare("SELECT COUNT(*) as count FROM images WHERE originalPath = ?")
      .get(originalPath) as { count: number };
    return result.count;
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

export interface IMAGE {
  id: number;
  name: string;
  path: string;
  originalPath: string | null;
  created_at: Date;
}
export default Image;
