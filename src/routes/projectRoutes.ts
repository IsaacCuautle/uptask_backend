import { Router } from "express";
import { body, param } from "express-validator";

import { ProjectController } from "../controller/ProjectController";
import { handleInputErrors } from "../middlewares/validation";
import { TaskController } from "../controller/TaskController";
import { ProjectExist } from "../middlewares/Project";
import { taskBelongsToProject, taskExist } from "../middlewares/Task";

const router = Router();

// Routes for projects
router.post(
  "/",
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .trim()
    .notEmpty()
    .withMessage("El cliente del proyecto es obligatorio"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.getProjectByID
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .trim()
    .notEmpty()
    .withMessage("El cliente del proyecto es obligatorio"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion del proyecto es obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  ProjectController.deleteProject
);

export default router;

// Routes for tasks
router.param("projectId", ProjectExist);
router.param("taskID", taskExist);
router.param("taskID", taskBelongsToProject);

router.post(
  "/:projectId/task",
  body("taskName").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion es obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get(
  "/:projectId/task",
  handleInputErrors,
  TaskController.getAllProjectTask
);

router.get(
  "/:projectId/task/:taskID",
  param("taskID").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.getTaskByID
);

router.put(
  "/:projectId/task/:taskID",
  param("taskID").isMongoId().withMessage("ID no valido"),
  body("taskName").trim().notEmpty().withMessage("El nombre es obligatorio"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripcion es obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);

router.delete(
  "/:projectId/task/:taskID",
  param("taskID").isMongoId().withMessage("ID no valido"),
  handleInputErrors,
  TaskController.deleteTask
);

router.post(
  "/:projectId/task/:taskID/status",
  param("taskID").isMongoId().withMessage("ID no valido"),
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErrors,
  TaskController.updateStatus
);
