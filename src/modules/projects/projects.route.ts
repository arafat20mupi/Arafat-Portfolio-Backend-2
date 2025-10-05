import { Router } from "express";
import { projectController } from "./projects.controller";
import { upload, uploadMultipleImages, uploadSingleImage, } from "../../middleware/uploadToCloudinary";

const router = Router();

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
    { name: "testimonialImage", maxCount: 1 }, 
  ]),
  uploadSingleImage("image"),
  uploadMultipleImages("images"),
  uploadSingleImage("testimonialImage"),
  projectController.createProject
);

router.post("/bulk", projectController.insertAllProjects);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

export default router;
