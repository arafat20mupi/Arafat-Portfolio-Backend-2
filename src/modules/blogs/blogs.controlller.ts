// controllers/blog.controller.ts
import { Request, Response } from "express";
import { blogService } from "./blogs.service";

declare global {
  namespace Express {
    interface Request {
      cloudinaryUrl?: string;
    }
  }
}

export const blogController = {
  async createBlog(req: Request, res: Response) {
    try {
      // Author ID (number)
      const authorId = Number(req.body.authorId);

      // Boolean fields
      const published = req.body.published === 'true' || req.body.published === true;
      const featured = req.body.featured === 'true' || req.body.featured === true;

      // Tags & keywords as array
      const tags = req.body.tags ? req.body.tags.split(',').map((t: string) => t.trim()) : [];
      const keywords = req.body.keywords ? req.body.keywords.split(',').map((k: string) => k.trim()) : [];

      const image = req.cloudinaryUrl || req.body.image || null;

      const payload = {
        ...req.body,
        authorId,
        featured,
        published,
        tags,
        image,
        seoTitle: req.body.metaTitle || req.body.seoTitle || null,
        seoDescription: req.body.metaDescription || req.body.seoDescription || null,
        seoKeywords: keywords || req.body.seoKeywords || null,
      };

      const blog = await blogService.createBlog(payload, authorId);
      res.status(201).json(blog);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },

  // Read All
  async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await blogService.getAllBlogs();
      res.json(blogs);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Read One
  async getBlogById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const blog = await blogService.getBlogById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });
      res.json(blog);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update
  async updateBlog(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const blog = await blogService.updateBlog(id, req.body);
      res.json(blog);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete
  async deleteBlog(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await blogService.deleteBlog(id);
      res.json({ message: "Blog deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};
