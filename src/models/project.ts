import mongoose, { Schema, Document, PopulatedDoc } from "mongoose";

import { InterfaceTask } from "./task";

export interface InterfaceProject extends Document {
  proyectName: string;
  clientName: string;
  description: string;
  task: PopulatedDoc<InterfaceTask & Document>[];
}

const ProjectSchema: Schema = new Schema(
  {
    projectName: {
      type: String,
      requiered: true,
      trim: true,
    },
    clientName: {
      type: String,
      requiered: true,
      trim: true,
    },
    description: {
      type: String,
      requiered: true,
      trim: true,
    },
    task: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model<InterfaceProject>("Project", ProjectSchema);
export default Project;
