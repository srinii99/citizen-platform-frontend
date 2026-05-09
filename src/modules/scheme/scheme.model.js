import mongoose from "mongoose";

const schemeSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      category: {
        type: String,
      },

      description: {
        type: String,
      },

      benefits: {
        type: String,
      },

      state: {
        type: String,
      },

      is_active: {
        type: Boolean,
        default: true,
      },

      eligibility_rules: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
    {
      timestamps: true,
    }
  );

export const Scheme =
  mongoose.model(
    "Scheme",
    schemeSchema
  );