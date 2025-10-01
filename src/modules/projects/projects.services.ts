import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const projectService = {
    getAllProjects: async () => {
        return await prisma.project.findMany({
            include: { challenges: true, testimonial: true }
        });
    },

    getProjectById: async (id: number) => {
        return await prisma.project.findUnique({
            where: { id },
            include: { challenges: true, testimonial: true }
        });
    },

    async createProject(data: any) {
        const { challenges, testimonial, ...projectData } = data;

        // Create project
        const project = await prisma.project.create({
            data: {
                ...projectData,
                challenges: {
                    create: challenges || [],
                },
                testimonial: testimonial
                    ? {
                        create: testimonial,
                    }
                    : undefined,
            },
            include: {
                challenges: true,
                testimonial: true,
            },
        });

        return project;
    },

  updateProject: async (id: number, data: any) => {
        return await prisma.project.update({
            where: { id },
            data: data,
        });
    },

    deleteProject: async (id: number) => {
        return await prisma.project.delete({
            where: { id },
        });
    },
};
