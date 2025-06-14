import { Request, Response } from "express";
import { join } from "path";
import sharp from "sharp";
import Image from "../models/Image";
import { IMAGE } from "../models/Image";
import { copyFile } from "fs/promises";


export async function resize(req: Request, res: Response) {
  const { width, height, name, id } = req.body;
  if (!width || !height) {
    res.status(400).send("There is no width or height");
    return;
  }
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }
  //# Resizing from id
  if (!req.file) {
    if (!id) {
      res.status(400).send("id is required");
      return;
    }
    const image: IMAGE | null = Image.getImageById(Number(id)) as IMAGE;
    if (!image) {
      res.status(404).send(`Image with id ${id} not found`);
      return;
    }
    try {
      if (image.originalPath) {
        const imageName = image.path.split("-")[2];
        const outputPath = join(
          __dirname,
          "..",
          `../public/images/resized-${width}x${height}-${imageName}`,
        );
        await handleResize(width, height, image.originalPath, outputPath);
        Image.create(
          name,
          `/images/resized-${width}x${height}-${imageName}`,
          image.originalPath,
        );
        
        res.json({
          resizedImage: `/images/resized-${width}x${height}-${imageName}`,
          message: "Image resized successfully",
        });
        return;
      }
      if (!image.originalPath) {
        const imageName = image.path.split("/")[2];
        const inputPath = join(__dirname, "..", `../public${image.path}`);
        const outputPath = join(
          __dirname,
          "..",
          `../public/images/resized-${width}x${height}-${imageName}`,
        );
        const copiedImgPath = join(
          __dirname,
          "..",
          `../public/images/copied-forResize-${imageName}`,
        );
        await copyFile(inputPath, copiedImgPath);
        await handleResize(width, height, inputPath, outputPath);
        Image.create(
          name,
          `/images/resized-${width}x${height}-${imageName}`,
          copiedImgPath,
        );
        
        res.json({
          resizedImage: `/images/resized-${width}x${height}-${imageName}`,
          message: "Image resized successfully",
        });
      }
    } catch (e: any) {
      let message;
      const errMessage: string = e.message;
      if (errMessage.includes("UNIQUE")) {
        message = `The image you trying to resize is already resized`;
      }
      res.json({
        message: message || "Error while resizing the image",
        error: e.message,
      });
    }
    return;
  }
  const inputPath = join(__dirname, "..", `../${req.file.path}`);
  const outputPath = join(
    __dirname,
    "..",
    `../public/images/resized-${width}x${height}-${req.file.filename}`,
  );

  try {
    await handleResize(width, height, inputPath, outputPath);
  } catch (e: any) {
    res.json({ message: "Error while resizing the image", error: e.message });
  }
  Image.create(
    name,
    `/images/resized-${width}x${height}-${req.file.filename}`,
    inputPath,
  );
  
  res.json({
    resizedImage: `/images/resized-${width}x${height}-${req.file.filename}`,
    message: "Image resized successfully",
  });
}

async function handleResize(
  width: number,
  height: number,
  inputPath: string,
  outputPath: string,
): Promise<void> {
  await sharp(inputPath)
    .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .resize(Number(width), Number(height), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toFile(outputPath);
}
