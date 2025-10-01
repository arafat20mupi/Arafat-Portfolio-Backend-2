// middleware/uploadToCloudinary.ts
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Multer setup (to read file from request)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const stream = cloudinary.uploader.upload_stream(
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      // save url for next route
      (req as any).cloudinaryUrl = result?.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};
