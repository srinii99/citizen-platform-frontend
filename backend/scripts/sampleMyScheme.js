import mongoose from "mongoose";
import dotenv from "dotenv";
import { Scheme } from "../src/modules/scheme/scheme.model.js";

dotenv.config();

await mongoose.connect(process.env.DB_URL);

const schemes = await Scheme.find({
  source: "MYSCHEME"
})
.limit(3)
.lean();

console.log(
  JSON.stringify(
    schemes,
    null,
    2
  )
);

process.exit(0);