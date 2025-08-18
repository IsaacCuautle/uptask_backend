import type { Request, Response } from "express";

import Task from "../models/task";
import Project from "../models/project";
import { NextFunction } from "express-serve-static-core";

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
      const { taskID } = req.params;
      const task = await Task.findById(taskID).populate("project");

      if (!task) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ error: error.message });
      }

      if (task.project.id !== req.project.id) {
        const error = new Error("Accion no valida");
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json(task);
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
    return;
  };

  static updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { taskID } = req.params;
    try {
      const updatedTask = req.body;
      const task = await Task.findByIdAndUpdate(taskID, updatedTask);

      if (!task) {
        const error = new Error("Tarea no encontrada");
        res.status(404).json({ error: error.message });
      }

      await task.save();
      res.status(201).send("Tarea actualizada correctamente");
    } catch (error) {
      console.log(`\nA ocurrido un error: ${error}\n`);
      res.status(500).json({ error: "Ocurrio un error" });
    }
  };
}
