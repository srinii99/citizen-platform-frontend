import mongoose from "mongoose";

const whatsappSessionSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    language: {
      type: String,
      default: "en",
    },

    currentStep: {
      type: String,
      default: "WELCOME",
    },

    consentAccepted: {
      type: Boolean,
      default: false,
    },

    profileData: {
      fullName: String,
      gender: String,
      dateOfBirth: String,
      state: String,
      district: String,
      annualIncome: Number,
      casteCategory: String,
      disabilityStatus: Boolean,
      occupation: String,
    },

    currentRecommendations: [
      {
        schemeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Scheme",
        },
        title: String,
        recommendationScore: Number,
      },
    ],

    currentPage: {
      type: Number,
      default: 1,
    },

    currentDocumentIndex: {
      type: Number,
      default: 0,
    },

    awaitingDocumentUpload: {
      type: Boolean,
      default: false,
    },

    reuploadDocumentIndex: {
      type: Number,
      default: -1,
    },

  

    selectedSchemeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
      default: null,
    },


    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      default: null,
    },

    eligibleSchemes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scheme",
      },
    ],

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);



export default
  mongoose.models.WhatsAppSession ||
  mongoose.model(
    "WhatsAppSession",
    whatsappSessionSchema
  );