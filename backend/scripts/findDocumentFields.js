import mongoose from "mongoose";
import dotenv from "dotenv";

import { MySchemeRaw }
from "../src/modules/scheme-import/models/myschemeRaw.model.js";

dotenv.config();

await mongoose.connect(
  process.env.DB_URL
);

const sample =
  await MySchemeRaw.findOne().lean();

function findKeys(obj, path = "") {

  if (!obj || typeof obj !== "object")
    return;

  Object.keys(obj).forEach(key => {

    const current =
      path
        ? `${path}.${key}`
        : key;

    if (
      key.toLowerCase().includes("document") ||
      key.toLowerCase().includes("doc")
    ) {
      console.log(current);
    }

    findKeys(
      obj[key],
      current
    );
  });
}

findKeys(sample.rawData);

process.exit(0);