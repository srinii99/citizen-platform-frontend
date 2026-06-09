import mongoose from "mongoose";

const sourceConfigSchema =
  new mongoose.Schema(
    {
      source: {
        type: String,
        required: true,
        unique: true,
      },

      enabled: {
        type: Boolean,
        default: true,
      },

      schedule: {
        type: String,
        default: "0 2 * * *",
      },


      lastRunAt: {
        type: Date,
      },

      lastStatus: {
        type: String,
        enum: [
          "SUCCESS",
          "FAILED",
          "PENDING",
        ],
        default: "PENDING",
      },

      lastError: {
        type: String,
        default: null,
      },
   
    },
    {
      timestamps: true,
    }
  );

export const SourceConfig =
  mongoose.model(
    "SourceConfig",
    sourceConfigSchema
  );