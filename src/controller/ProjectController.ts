import type { Request, Response } from 'express'

export class ProjectController {
    static getAllProjects = async (req: Request, res: Response) => {
        await res.send('Todos los proyectos')
        return;
    }
}