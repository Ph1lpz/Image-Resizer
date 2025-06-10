import Router from "express";
import upload from "../middleware/multer";
import apicache from "apicache";
import {
  getImages,
  uploadImage,
  getImageById,
  editImageName,
  deleteImage,
} from "../controllers/ImagesController";
const router = Router();
let cache = apicache.middleware;

router.get("/", cache("10 minutes"), getImages);
router.get("/:id", getImageById); // maybe will deleted
router.post("/upload", upload.single("file"), uploadImage);
router.put("/:id", editImageName);
router.delete("/:id", deleteImage);

export default router;
