import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
  PENDING: "pending",
  HOLD: "hold",
  IN_PROGRESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed",
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface InterfaceTask extends Document {
  taskName: string;
  description: string;
  project: Types.ObjectId;
  status: TaskStatus;
}

const TaskSchema: Schema = new Schema(
  {
    taskName: {
      type: String,
      requiered: true,
      trim: true,
    },
    description: {
      type: String,
      requiered: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model<InterfaceTask>("Task", TaskSchema);
export default Task;
