import mongoose from "mongoose";

const applicationSchema =
  new mongoose.Schema(
    {
      user_id: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      scheme_id: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Scheme",

        required: true,
      },

      status: {
        type: String,

        enum: [
          "STARTED",
          "IN_PROGRESS",
          "SUBMITTED",
          "APPROVED",
          "REJECTED",
        ],

        default: "STARTED",
      },

      payment_status: {
        type: String,

        enum: [
          "PENDING",
          "PAID",
        ],

        default: "PENDING",
      },

      affidavit_status: {
        type: String,

        enum: [
          "PENDING",
          "GENERATED",
        ],

        default: "PENDING",
      },

      documents: [
        {
          name: String,
          file_url: String,
        },
      ],

      created_at: {
        type: Date,
        default: Date.now,
      },
    }
  );

export const Application =
  mongoose.model(
    "Application",
    applicationSchema
  );