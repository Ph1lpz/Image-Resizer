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
const upload = multer({ storage });
export default upload;
