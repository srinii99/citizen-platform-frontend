import mongoose from "mongoose";

const templateSchema = new mongoose.Schema({
  type: { type: String, unique: true },
  title: String,
  content: [String], // lines with placeholders
  created_at: { type: Date, default: Date.now }
});

export const Template = mongoose.model("Template", templateSchema);