import Router from "express";
import {
  getImages,
  upload,
  uploadImage,
} from "../controllers/ImagesController";
const router = Router();

router.get("/", getImages);
router.post("/upload", upload.single("file"), uploadImage);

export default router;
