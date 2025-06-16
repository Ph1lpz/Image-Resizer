import Image from "../models/Image";
import { join } from "path";
import { unlink } from "fs/promises";
import { Request, Response } from "express";
import { IMAGE } from "../models/Image";

export function getImages(_req: Request, res: Response):void {
  try {
    const images = Image.getAll();
    res.status(200).json(images);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while sending the images", error: e.message });
  }
}
export function getImageById(req: Request, res: Response):void {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    res.status(400).send(`Image with id ${id} is not found`);
    return;
  }
  try {
    const image = Image.getImageById(Number(id));
    if (image == null) {
      res.status(404).send(`Image with id ${id} is not found`);
      return;
    }
    res.status(200).json(image);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while sending the image", error: e.message });
  }
}
export function uploadImage(req: Request, res: Response):void {
  if (!req.file) {
    res.status(400).send("No image uploaded");
    return;
  }

  const { name } = req.body;
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }

  const path = `/images/${req.file?.filename}`;
  try {
    const lastInsertRowid = Image.create(name, path);
    
    res.status(201).json(`Image created with id: ${lastInsertRowid}`);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while creating the image", error: e.message });
  }
}

export function editImageName(req: Request, res: Response):void {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    res.status(400).send(`image id cannot be ${id}`);
    return;
  }
  const { name } = req.body;
  if (!name) {
    res.status(400).send("New name is required");
    return;
  }
  try {
    const isUpdated = Image.edit(name, Number(id));
    if (!isUpdated) {
      res.status(404).send(`Image with id ${id} is not found`);
      return;
    }
    ;
    res.status(200).send(`Image with id ${id} edited successfully`);
  } catch (e: any) {
    const errMessage: string = e.message;
    if (errMessage.includes("this.getIndex")) {
      res.status(200).send(`Image with id ${id} edited successfully`);
      return;
    }
    res
      .status(500)
      .json({ message: "Error while sending the image", error: errMessage });
  }
}
export async function deleteImage(req: Request, res: Response):Promise<void> {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    res.status(400).send("Invalid image ID");
    return;
  }
  const imageId = Number(id);
  const image: IMAGE | null = Image.getImageById(imageId);
  if (!image) {
    res.status(404).send(`Image with id ${id} not found`);
    return;
  }
  const imagesCount = Image.countImagesByOriginalPath(image.originalPath);
  const isDeleted = Image.delete(imageId);
  if (isDeleted == false) {
    res.status(404).send(`Error while deleting image with id ${imageId}`);
    return;
  }
  try {
    const fullPath = join(__dirname, "..", "../public", image.path);
    if (image.originalPath && imagesCount === 1) {
      await unlink(fullPath);
      await unlink(image.originalPath);
      ;
      res.status(200).send(`Image with id ${id} deleted successfully`);
      return;
    }
    await unlink(fullPath);
    ;
    res.status(200).send(`Image with id ${id} deleted successfully`);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while sending the image", error: e.message });
  }
}
