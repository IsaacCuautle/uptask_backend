import type { Request, Response } from "express";

import Project from "../models/Project";

export class ProjectController {
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.status(200).json(projects);
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }
    return;
  };

  static getProjectByID = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate("task");

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }
    return;
  };

  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);


    try {
      await project.save();
      return res.status(201).send("Proyecto Creado correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }

    return;
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const updatedProject = req.body;
      const project = await Project.findByIdAndUpdate(id, updatedProject);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
      }

      await project.save();
      res.status(201).send("Proyecto actualizado correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }
    return;
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
      }

      await project.deleteOne();

      res.status(200).send("Proyecto eliminado correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }
    return;
  };
}
