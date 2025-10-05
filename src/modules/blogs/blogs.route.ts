// routes/blog.routes.ts
import { Router } from "express";
import { blogController } from "./blogs.controlller";
import { upload, uploadSingleImage,   } from "../../middleware/uploadToCloudinary";

const router = Router();

router.post("/bulk", blogController.insertAllBlogs);

router.post("/",
    upload.single("image"),
    uploadSingleImage("image"),
    blogController.createBlog
);
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

//  post all blogs

export const blogsRouter = router;