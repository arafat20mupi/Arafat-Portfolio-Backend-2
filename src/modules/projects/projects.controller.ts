import { Request, Response } from "express";
import { projectService } from "./projects.services";

export const projectController = {
    getAllProjects: async (req: Request, res: Response) => {
        try {
            const projects = await projectService.getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch projects" });
        }
    },

    getProjectById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const project = await projectService.getProjectById(id);
            if (!project) return res.status(404).json({ message: "Project not found" });
            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch project" });
        }
    },

    async createProject(req: Request, res: Response) {
        try {
            const {
                title,
                description,
                longDescription,
                category,
                tech,
                github,
                live,
                duration,
                team,
                year,
                features,
                challenges,
                testimonialName,
                testimonialRole,
                testimonialCompany,
                testimonialQuote,
            } = req.body;


            const projectData = {
                title,
                description,
                longDescription,
                category,
                tech: tech ? tech.split(",").map((t: string) => t.trim()) : [],
                github,
                live,
                duration,
                team,
                year,
                features: features ? features.split(",").map((f: string) => f.trim()) : [],
                image: (req as any).imageUrl || null,
                images: (req as any).imagesUrls || [],
                challenges: challenges ? JSON.parse(challenges) : [],
                testimonial: testimonialName
                    ? {
                        name: testimonialName,
                        role: testimonialRole,
                        company: testimonialCompany,
                        quote: testimonialQuote,
                        image: (req as any).testimonialImageUrl || null,
                    }
                    : undefined,
            };

            const project = await projectService.createProject(projectData);
            res.status(201).json({ success: true, project });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ success: false, message: err.message });
        }
    },

    updateProject: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            const project = await projectService.updateProject(id, data);
            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update project" });
        }
    },

    deleteProject: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            await projectService.deleteProject(id);
            res.status(200).json({ message: "Project deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete project" });
        }
    },
};
