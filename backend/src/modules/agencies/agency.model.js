import mongoose from "mongoose";

const agencySchema = new mongoose.Schema(
  {
    
    agency_code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
        
    name: {
      type: String,
      required: true,
      trim: true,
    },

    contact_person: {
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

    address: {
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
  "Agency",
  agencySchema
);