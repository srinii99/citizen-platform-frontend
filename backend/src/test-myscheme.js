import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { importMyScheme } from "./services/importers/myschemeImporter.js";

const run = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo Connected");

    const result = await importMyScheme();

    console.log(result);

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

run();