import mongoose from "mongoose";
import dotenv from "dotenv";

import { Scheme }
from "../src/modules/scheme/scheme.model.js";

dotenv.config();

await mongoose.connect(
  process.env.DB_URL
);

const scheme =
  await Scheme.findOne({
    title: "Stand-Up India"
  }).lean();

console.log(
  JSON.stringify(
    scheme,
    null,
    2
  )
);

process.exit(0);