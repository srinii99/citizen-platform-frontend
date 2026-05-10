import mongoose from "mongoose";

const schemeSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    department: {
      type: String
    },

    benefits: {
      type: String
    },

    documents_required: [
      String
    ],

    application_fee: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "INACTIVE"
      ],
      default: "ACTIVE"
    },

    // ✅ Eligibility Rules
    eligibility: {

      min_age: {
        type: Number,
        default: 0
      },

      max_age: {
        type: Number,
        default: 100
      },

      gender: {
        type: String,
        enum: [
          "MALE",
          "FEMALE",
          "OTHER",
          "ANY"
        ],
        default: "ANY"
      },

      max_income: {
        type: Number,
        default: 999999999
      },

      state: {
        type: String,
        default: "ANY"
      },

      caste: {
        type: String,
        default: "ANY"
      },

      occupation: {
        type: String,
        default: "ANY"
      }
    }

  },

  {
    timestamps: true
  }
);

export const Scheme =
  mongoose.model(
    "Scheme",
    schemeSchema
  );