import type { Request, Response } from 'express'

import Project from '../models/project';

export class ProjectController {
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.status(200).json(projects)

        } catch (error) {
            console.log(`\nA ocurrido un error: ${error}\n`);
        }
        return;
    }

    static getProjectByID = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const project = await Project.findById(id);
            res.status(200).json(project)

        } catch (error) {
            console.log(`\nA ocurrido un error: ${error}\n`);
        }
        return;
    }

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        try {

            await project.save();
            return res.status(201).send('Proyecto Creado correctamente');

        } catch (error) {
            console.log(`\nA ocurrido un error: ${error}\n`);
        }

        return;
    }
}