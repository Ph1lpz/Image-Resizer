import multer from "multer";

import { resolve } from "path";
import { Router, Request, Response } from "express";

const router = Router();
const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const { width, height } = req.params;
    cb(null, file.originalname + `${width}x${height}`);
  },
});
export const upload = multer({ storage });

export function getImages(req: Request, res: Response) {}

export function uploadImage(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).send("No file uploaded");
  }
}
