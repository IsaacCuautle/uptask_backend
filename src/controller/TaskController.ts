import type { Request, Response } from "express";

import Task from "../models/task";
import Project from "../models/project";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.task.push(task.id);

      await Promise.allSettled([task.save(), req.project.save()]);

      res.status(201).send("Tarea creada correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }

    return;
  };

  static getAllProjectTask = async (req: Request, res: Response) => {
    try {
      let task = await Task.find({ project: req.project.id });

      res.status(200).json(task);
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
    return;
  };
}
