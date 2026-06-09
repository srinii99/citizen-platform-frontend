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

            // -------------------------
      // AGENCY / AGENT WORKFLOW
      // -------------------------

      assigned_agency_id: {

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


      // -------------------------
      // WORKFLOW TYPE
      // -------------------------

      workflow_type: {

        type: String,

        enum: [

          "DIRECT_API",

          "AGENT_BASED",
        ],

        default: "DIRECT_API",
      },


      // -------------------------
      // GOVT SUBMISSION MODE
      // -------------------------

      govt_submission_mode: {

        type: String,

        enum: [

          "API",

          "MANUAL",
        ],

        default: "MANUAL",
      },


      // -------------------------
      // SLA TRACKING
      // -------------------------

      expected_completion_days: {

        type: Number,

        default: 30,
      },

      sla_due_date: {

        type: Date,
      },

      delayed_reason: {

        type: String,

        default: "",
      },


      // -------------------------
      // SOURCE TRACKING
      // -------------------------

      submitted_via: {

        type: String,

        enum: [

          "WEB",

          "WHATSAPP",

          "AGENCY",
        ],

        default: "WEB",
      },

      status: {
        type: String,

        enum: [
      
      
          "DRAFT",
          "PROFILE_PENDING",
          "DOCUMENT_PENDING",
          "STARTED",
          "SUBMITTED",
          "UNDER_REVIEW",
          "NEEDS_MORE_INFO",
          "DOCUMENT_VERIFIED",
          "ASSIGNED_TO_AGENT",
          "ASSIGNED_TO_AGENCY",
          "FORWARDED_TO_GOVT",
          "GOVT_UNDER_REVIEW",
          "APPROVED",
          "REJECTED",
          "BENEFIT_DISBURSED"

        ],

        default: "STARTED",
      },

      status_history: [

        {

          status: {

            type: String,
          },

          admin_remarks: {
            type: String,
            default: "",
          },

          updated_at: {

            type: Date,

            default: Date.now,
          },

     
        },
      ],

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

      admin_remarks: {
        type: String,
        default: "",
      },

 

      documents: [

        {
          document_name: String,

          document_type: String,

          file_url: String,

          whatsapp_media_id: String,

          uploaded_at: {
            type: Date,
            default: Date.now,
          },

          verification_status: {

            type: String,

            enum: [

              "PENDING",

              "VERIFIED",

              "REJECTED"
            ],

            default: "PENDING",
          },

          verification_remarks: {

            type: String,

            default: "",
          },
        },
      ],




      updated_at: {
        type: Date,
        default: Date.now,
      },

      govt_submission_id: {
        type: String,
        default: "",
      },

      govt_department: {
        type: String,
        default: "",
      },

      govt_reference_number: {
        type: String,
        default: "",
      },

      govt_status: {
        type: String,
        default: "",
      },

      govt_response: {
        type: String,
        default: "",
      },

      forwarded_to_govt_at: {
        type: Date,
      },
    }
  );

  

export const Application =
  mongoose.model(
    "Application",
    applicationSchema
  );