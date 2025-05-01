import Router from "express";
import upload from "../middleware/multer";
import {
  getImages,
  uploadImage,
  getImageById,
  editImageName,
  deleteImage,
} from "../controllers/ImagesController";
const router = Router();

router.get("/", getImages);
router.get("/:id", getImageById);
router.post("/upload", upload.single("file"), uploadImage);
router.put("/:id", editImageName);
router.delete("/:id", deleteImage);

export default router;
