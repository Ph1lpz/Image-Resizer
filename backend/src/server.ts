import express from "express";
import { join } from "path";
import imageRouter from "./routes/images";
import resizeRouter from "./routes/resize";
import handleExtention from "./middleware/fileExtHandler";
import cors from "cors";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
const staticFilesPath = join(__dirname, "..", "public", "images");
app.use(express.json());

app.use(
  "/static/images",
  express.static(staticFilesPath, {
    maxAge: 86400000,
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=86400");
    },
  }),
);

app.use("/images", imageRouter);
app.use("/resize", resizeRouter);
app.use(handleExtention);
app.listen(8000, () => {
  console.log("Server is listening on port 8000...");
});

export default app;
