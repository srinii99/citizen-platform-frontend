import mongoose from "mongoose";
import dotenv from "dotenv";

import { MySchemeRaw }
from "../src/modules/scheme-import/models/myschemeRaw.model.js";

dotenv.config();

await mongoose.connect(process.env.DB_URL);

const count =
  await MySchemeRaw.countDocuments();

console.log("\nRAW RECORD COUNT:", count);

const sample =
  await MySchemeRaw.findOne().lean();

console.log(
  JSON.stringify(
    sample,
    null,
    2
  )
);

process.exit(0);