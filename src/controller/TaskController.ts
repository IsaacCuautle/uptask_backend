import type { Request, Response } from "express";

import Task from "../models/task";
import Project from "../models/project";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      const project = await Project.findById(projectId);

      if (!project) {
        const eror = new Error("Projecto no encontrado");
        res.status(404).send({ error: eror.message });
        return;
      }

      try {
        const task = new Task(req.body);
        task.project = project.id;
        await task.save();

        project.task.push(task.id);
        await project.save();

        res.status(201).send("Tarea creada correctamente");
      } catch (error) {
        console.log(`\nA ocurrido un error: ${error}\n`);
      }
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }

    return;
  };
}
