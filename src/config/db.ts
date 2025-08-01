import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.cyan.bold(`\nMONGO DB CONECTADO EN: ${url}\n`));
  } catch (error) {
    console.log(
      colors.red.bold(`Ocurrio un error al conectar a la DB: ${error.message}`)
    );
    exit(1);
  }
};
