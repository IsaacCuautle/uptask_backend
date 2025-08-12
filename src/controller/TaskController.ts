import type { Request, Response } from "express";

import Task from "../models/task";
import Project from "../models/project";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      await task.save();

      req.project.task.push(task.id);
      await req.project.save();

      res.status(201).send("Tarea creada correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }

    return;
  };
}
