import mongoose from "mongoose";

const assignmentSchema =
  new mongoose.Schema(
    {
      application_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        required: true,
      },

      assigned_type: {
        type: String,
        enum: ["AGENT", "AGENCY"],
        required: true,
      },

      assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

      assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      remarks: {
        type: String,
      },

      assigned_at: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "AssignmentHistory",
  assignmentSchema
);