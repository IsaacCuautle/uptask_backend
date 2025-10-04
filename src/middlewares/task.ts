import type { Request, Response, NextFunction } from "express";
import Task, { InterfaceTask } from "../models/Task";

declare global {
  namespace Express {
    interface Request {
      task: InterfaceTask;
    }
  }
}

export async function taskExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { taskID } = req.params;
    const task = await Task.findById(taskID);

    if (!task) {
      const eror = new Error("Tarea no encontrada");
      res.status(404).send({ error: eror.message });
      return;
    }

    req.task = task;
    next();
  } catch (error) {
    console.log(`\nA ocurrido un error: ${error}\n`);
  }
}

export async function taskBelongsToProject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(400).json({ error: error.message });
  }

  next();
}
