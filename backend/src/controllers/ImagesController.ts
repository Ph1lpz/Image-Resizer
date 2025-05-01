import Image from "../models/Image";
import { join, extname } from "path";
import { unlink } from "fs/promises";
import { Request, Response } from "express";

export function getImages(req: Request, res: Response) {
  try {
    const images = Image.getAll();
    res.status(200).json(images);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while sending the images", error: e.message });
  }
}
export function getImageById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const image = Image.getImageById(Number(id));
    if (image == null) {
      res.status(400).send(`Image with id ${id} is not found`);
      return;
    }
    res.status(200).json(image);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while sending the image", error: e.message });
  }
}
export function uploadImage(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).send("No image uploaded");
    return;
  }

  const { name } = req.body;
  if (!name) {
    res.status(400).send("Name is required");
    return;
  }

  const fileExtention: any = extname(req.file.filename);
  const validExtensions = [".png", ".jpg", ".jpeg", ".gif"];
  if (
   !validExtensions.includes(fileExtention)
  ) {
    res.status(400).send(`${fileExtention} is not image extention`);
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

export function editImageName(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    res.status(400).send("New name is required");
    return;
  }
  try {
    const image = Image.edit(name, Number(id));
    if (image == false) {
      res.status(400).send(`Image with id ${id} is not found`);
      return;
    }
    res.status(200).send(`Image with id ${id} edited successfully`);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while sending the image", error: e.message });
  }
}

export async function deleteImage(req: Request, res: Response) {
  const { id } = req.params;
  const { path } = req.body;
  if(!path){
    res.status(400).send('There is no path');
    return;
  }
  try {
    const image = Image.delete(Number(id));
    if (image == false) {
      res.status(400).send(`Image with id ${id} is not found`);
      return;
    }
    const fullPath = join(__dirname, "..", "..", "public", path);
    await unlink(fullPath);
    res.status(200).send(`Image with id ${id} deleted successfully`);
  } catch (e: any) {
    res
      .status(500)
      .json({ message: "Error while sending the image", error: e.message });
  }
}
