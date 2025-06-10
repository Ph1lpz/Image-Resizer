import { Response, Request, NextFunction } from "express";

function handleExtention(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    error.message.includes("Only .png, .jpg, .jpeg, and .gif files are allowed")
  ) {
    res.status(400).json({
      error: "Invalid file type",
      message: "Only .png, .jpg, .jpeg, and .gif files are allowed!",
    });
  } else {
    next(error);
  }
}

export default handleExtention;
