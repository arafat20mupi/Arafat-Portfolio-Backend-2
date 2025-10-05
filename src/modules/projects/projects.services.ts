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

    insertMany: async (projects: any[]) => {
        const createdProjects = [];

        for (const project of projects) {
            const { challenges, testimonial, ...projectData } = project;

            const created = await prisma.project.create({
                data: {
                    ...projectData,
                    challenges: challenges
                        ? {
                            create: challenges.map((c: any) => ({
                                title: c.title,
                                description: c.description,
                            })),
                        }
                        : undefined,
                    testimonial: testimonial
                        ? {
                            create: {
                                name: testimonial.name || "Anonymous",
                                role: testimonial.role || "Client",
                                company: testimonial.company || "N/A",
                                quote: testimonial.quote || testimonial.text,
                                image: testimonial.image || null,
                            },
                        }
                        : undefined,
                },
                include: {
                    challenges: true,
                    testimonial: true,
                },
            });

            createdProjects.push(created);
        }

        return createdProjects;
    },
};
