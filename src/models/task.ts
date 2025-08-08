import mongoose, { Schema, Document, Types } from "mongoose";

export interface InterfaceTask extends Document {
  taskName: string;
  description: string;
  project: Types.ObjectId;
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
  },
  { timestamps: true }
);

const Task = mongoose.model<InterfaceTask>("Task", TaskSchema);
export default Task;
