import mongoose from "mongoose";
import dotenv from "dotenv";

import { Scheme }
from "../src/modules/scheme/scheme.model.js";

dotenv.config();

await mongoose.connect(
  process.env.DB_URL
);

const total =
  await Scheme.countDocuments({
    source: "MYSCHEME"
  });

const report = {};

report.categories =
  await Scheme.countDocuments({
    source: "MYSCHEME",
    categories: { $exists: true, $ne: [] }
  });

report.beneficiaries =
  await Scheme.countDocuments({
    source: "MYSCHEME",
    beneficiaries: { $exists: true, $ne: [] }
  });

report.tags =
  await Scheme.countDocuments({
    source: "MYSCHEME",
    tags: { $exists: true, $ne: [] }
  });

report.benefits =
  await Scheme.countDocuments({
    source: "MYSCHEME",
    benefits: { $ne: "" }
  });

report.eligibility =
  await Scheme.countDocuments({
    source: "MYSCHEME",
    eligibility: { $ne: "" }
  });

console.log("\nTotal:", total);
console.table(report);

process.exit(0);