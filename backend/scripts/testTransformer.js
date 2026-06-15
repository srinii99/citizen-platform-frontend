import mongoose from "mongoose";
import dotenv from "dotenv";

import { MySchemeRaw }
from "../src/modules/scheme-import/models/myschemeRaw.model.js";

import {
  transformMySchemeRecord
}
from "../src/modules/scheme-import/transformers/myscheme.transformer.js";

dotenv.config();

await mongoose.connect(
  process.env.DB_URL
);

const raw =
  await MySchemeRaw.findOne();

const result =
  await transformMySchemeRecord(raw);

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);

process.exit(0);