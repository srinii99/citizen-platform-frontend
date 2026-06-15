import mongoose from "mongoose";
import dotenv from "dotenv";

import {
  transformAllMySchemes
} from "../src/modules/scheme-import/services/transformMyScheme.service.js";

dotenv.config();

async function run() {
  try {

    await mongoose.connect(
      process.env.DB_URL
    );

    console.log(
      "Starting Backfill..."
    );

    const stats =
      await transformAllMySchemes();

    console.log(
      "\nBACKFILL COMPLETE"
    );

    console.log(stats);

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);
  }
}

run();