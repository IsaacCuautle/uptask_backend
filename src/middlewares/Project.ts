import type { Request, Response, NextFunction } from "express";
import Project, { InterfaceProject } from "../models/project";

declare global {
  namespace Express {
    interface Request {
      project: InterfaceProject;
    }
  }
}

export async function validateProjectExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      const eror = new Error("Projecto no encontrado");
      res.status(404).send({ error: eror.message });
      return;
    }

    req.project = project;
    next();
  } catch (error) {
    console.log(`\nA ocurrido un error: ${error}\n`);
  }
}
