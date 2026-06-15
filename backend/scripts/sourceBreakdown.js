import mongoose from "mongoose";
import dotenv from "dotenv";
import { Scheme } from "../src/modules/scheme/scheme.model.js";

dotenv.config();

await mongoose.connect(process.env.DB_URL);

const result = await Scheme.aggregate([
  {
    $group: {
      _id: "$source",
      count: { $sum: 1 }
    }
  }
]);

console.table(result);

process.exit(0);