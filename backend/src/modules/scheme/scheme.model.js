import mongoose from "mongoose";

const schemeSchema =
  new mongoose.Schema({

    source: {
      type: String,
      enum: ["MANUAL", "MYSCHEME", "APISETU"],
      default: "MANUAL",
    },

    sourceSchemeId: {
      type: String,
      default: "",
    },

    slug: {
      type: String,
      default: "",
    },

    externalSchemeId: {
      type: String,
      default: null,
    },

    ministry: {
      type: String,
      default: "",
    },

    applicationUrl: {
      type: String,
      default: "",
    },

    officialWebsite: {
      type: String,
      default: "",
    },

    lastSyncedAt: {
      type: Date,
      default: null,
    },

    syncStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "SUCCESS",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    shortTitle: {
      type: String,
      default: "",
    },

    detailedDescription: {
      type: String,
      default: "",
    },

    categories: [
      {
        type: String,
      },
    ],

    beneficiaries: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
      },
    ],

    schemeOpenDate: {
      type: Date,
      default: null,
    },

    schemeCloseDate: {
      type: Date,
      default: null,
    },

    department: {
      type: String,
      required: true,
    },

    benefits: {
      type: String,
      default: "",
    },

    application_fee: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,

      enum: [
        "ACTIVE",
        "INACTIVE",
      ],

      default: "ACTIVE",
    },

    documents_required: [

      {
        type: String,
      },
    ],

    eligibility: {
      type: String,
      default: "",
    },

    eligibilityRules: {

      min_age: {
        type: Number,
        default: 0,
      },

      max_age: {
        type: Number,
        default: 120,
      },

      gender: {
        type: String,
        default: "ANY",
      },

      max_income: {
        type: Number,
        default: 999999999,
      },

      state: {
        type: String,
        default: "ANY",
      },

      caste: {
        type: String,
        default: "ANY",
      },

      occupation: {
        type: String,
        default: "ANY",
      },

      disability_required: {
        type: Boolean,
        default: false,
      },

      student_required: {
        type: Boolean,
        default: false,
      },

      farmer_required: {
        type: Boolean,
        default: false,
      },

      marital_status: {
        type: String,
        default: "ANY",
      },
    },

    // NEW FIELDS

    schemeScope: {
      type: String,
      enum: ["CENTRAL", "STATE"],
      default: "CENTRAL",
    },

    applicableStates: [{
      type: String,
    }],

     

  }, {

    timestamps: true,
  });

export const Scheme =
  mongoose.models.Scheme ||

  mongoose.model(
    "Scheme",
    schemeSchema
  );