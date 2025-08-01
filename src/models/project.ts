import mongoose, { Schema, Document } from "mongoose";

export type ProjectType = Document & {
  proyectName: string;
  clientName: string;
  description: string;
};

const ProjectSchema: Schema = new Schema({
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
});

const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;
