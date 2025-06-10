import { extname } from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "public/images");
  },
  filename: (_req, file, cb) => {
    const imageExtension = extname(file.originalname);
    cb(null, Date.now() + imageExtension);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const validExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
    const ext = extname(file.originalname).toLowerCase();
    if (validExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only .png, .jpg, .jpeg, webp and .gif files are allowed!"));
    }
  },
});
export default upload;
