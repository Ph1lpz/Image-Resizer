import { Router } from "express";
import { resize } from "../controllers/ResizeController";
import upload from "../middleware/multer";
import Image from "../models/Image";
import handleExtention from "../middleware/fileExtHandler";
const router = Router();

router.post("/", upload.single("file"), resize);

export default router;
