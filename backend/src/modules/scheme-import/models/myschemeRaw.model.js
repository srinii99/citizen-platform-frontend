import mongoose from "mongoose";

const mySchemeRawSchema =
  new mongoose.Schema(
    {
      source: {
        type: String,
        default: "MYSCHEME",
      },

      schemeId: {
        type: String,
        index: true,
      },

      slug: {
        type: String,
        unique: true,
      },

      rawData: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },

      importedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export const MySchemeRaw =
  mongoose.models.MySchemeRaw ||
  mongoose.model(
    "MySchemeRaw",
    mySchemeRawSchema
  );