import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    agent_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    agency_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    specialization: {
      type: String,
      trim: true,
    },

    district: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    assigned_schemes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Scheme",
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Agent",
  agentSchema
);