import mongoose from "mongoose";

const importJobSchema =
  new mongoose.Schema(
    {
      source: {
        type: String,
        required: true,
      },

      importedCount: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "RUNNING",
          "SUCCESS",
          "FAILED",
        ],
        default: "RUNNING",
      },

      startedAt: {
        type: Date,
        default: Date.now,
      },

      completedAt: {
        type: Date,
        default: Date.now,
      },

      errorMessage: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

export const ImportJob =
  mongoose.models.ImportJob ||
  mongoose.model(
    "ImportJob",
    importJobSchema
  );