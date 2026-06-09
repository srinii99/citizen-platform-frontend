import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema({

    mobile: {

      type: String,

      required: true,

      unique: true,
    },


    role: {

      type: String,

      enum: [

        "SUPER_ADMIN",

        "EXECUTIVE",

        "ADMIN",

        "AGENCY",

        "AGENT",

        "USER",
      ],

      default: "USER",
    },

    agency_id: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Agency",

      default: null,
    },

    assigned_agent_id: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Agent",

      default: null,
    },

    preferred_language: {

      type: String,

      enum: [
        "EN",
        "KN"
      ],

      default: "EN",
    },

    whatsapp_opt_in: {

      type: Boolean,

      default: true,
    },
 

    otp: {
      type: String,
    },

    otp_expiry: {
      type: Date,
    },

    // -------------------------
// WHATSAPP FLOW STATE
// -------------------------

    whatsapp_flow_state: {

      type: String,

      default: "WELCOME",
    },

    selected_scheme_id: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Scheme",

      default: null,
    },

    current_document_index: {

      type: Number,

      default: 0,
    },


    // -------------------------
    // PROFILE
    // -------------------------

    name: {

      type: String,

      default: "",
    },

    age: {

      type: Number,
    },

    gender: {

      type: String,

      enum: [
        "MALE",
        "FEMALE",
        "OTHER",
      ],
    },

    aadhaar_name: {

      type: String,

      default: "",
    },

    city: {

      type: String,

      default: "",
    },

    religion: {

      type: String,

      default: "",
    },

    address: {

      type: String,

      default: "",
    },

    profile_photo: {

      type: String,

      default: "",
    },

    profile_completion_percentage: {

      type: Number,

      default: 0,
    },

    income: {

      type: Number,
    },

    state: {

      type: String,

      default: "",
    },

    district: {

      type: String,

      default: "",
    },

    caste: {

      type: String,

      default: "",
    },

    occupation: {

      type: String,

      default: "",
    },

    is_disabled: {

      type: Boolean,

      default: false,
    },

    is_student: {

      type: Boolean,

      default: false,
    },

    is_farmer: {

      type: Boolean,

      default: false,
    },

    marital_status: {

      type: String,

      enum: [
        "SINGLE",
        "MARRIED",
        "WIDOW",
      ],
    },

    profile_completed: {

      type: Boolean,

      default: false,
    },

    // -------------------------
// CONSENT MANAGEMENT
// -------------------------

    consent: {

      accepted: {

        type: Boolean,

        default: false,
      },

      accepted_at: {

        type: Date,
      },

      consent_version: {

        type: String,

        default: "v1",
      },

      ip_address: {

        type: String,

        default: "",
      },
    },

   
    // -------------------------
    // SYSTEM
    // -------------------------

    created_at: {

      type: Date,

      default: Date.now,
    },
  });


export const User =

  mongoose.models.User ||

  mongoose.model(

    "User",

    userSchema
  );