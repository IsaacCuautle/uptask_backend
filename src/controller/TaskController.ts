import type { Request, Response } from "express";

import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);
      task.project = req.project.id;
      req.project.tasks.push(task.id);

      await Promise.allSettled([task.save(), req.project.save()]);

      res.status(201).send("Tarea creada correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
    }

    return;
  };

  static getAllProjectTask = async (req: Request, res: Response) => {
    try {
      const task = await Task.find({ project: req.project.id }).populate(
        "project"
      );

      res.status(200).json(task);
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
    return;
  };

  static getTaskByID = async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.task);
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
    return;
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.taskName = req.body.taskName;
      req.task.description = req.body.description;
      await req.task.save();

      res.status(201).send("Tarea actualizada correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      req.project.tasks = req.project.tasks.filter(
        (task) => task.toString() !== req.task.id
      );

      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.status(201).send("Tarea eliminada correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      req.task.status = status;
      await req.task.save();

      res.status(201).send("Status actualizado correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
  };
}
