import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import {
  importMySchemeRaw,
} from "./modules/scheme-import/importers/myscheme.importer.js";

const run = async () => {

  await mongoose.connect(
    process.env.DB_URL
  );

  const stats =
    await importMySchemeRaw();

  console.log(stats);

  process.exit(0);
};

run();