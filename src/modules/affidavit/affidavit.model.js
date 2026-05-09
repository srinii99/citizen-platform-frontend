import mongoose from "mongoose";

const affidavitSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  application_id: mongoose.Schema.Types.ObjectId,
  type: String,
  content: String,
  status: {
    type: String,
    default: "GENERATED"
  },
  created_at: { type: Date, default: Date.now }
});

export const Affidavit = mongoose.model("Affidavit", affidavitSchema);