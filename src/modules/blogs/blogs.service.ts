// services/blog.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const blogService = {
  // Create Blog
  async createBlog(data: any, authorId: number) {
    return prisma.blog.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        readTime: data.readTime,
        published: data.published,
        featured: data.featured,
        tags: data.tags,
        authorId,
        image: data.image,

        // ✅ Map correctly
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords || null,
      },
    });
  },

  // Get All Blogs
  async getAllBlogs() {
    return prisma.blog.findMany({
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
  },

  // Get Blog by ID
  async getBlogById(id: number) {
    return prisma.blog.findUnique({
      where: { id },
      include: { author: true },
    });
  },

  // Update Blog
  async updateBlog(id: number, data: any) {
    return prisma.blog.update({
      where: { id },
      data,
    });
  },

  // Delete Blog
  async deleteBlog(id: number) {
    return prisma.blog.delete({
      where: { id },
    });
  },
};
