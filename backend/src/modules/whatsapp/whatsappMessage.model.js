import mongoose
from "mongoose";

const whatsappMessageSchema =
  new mongoose.Schema(

    {

      mobile: {

        type: String,

        required: true,
      },

      message_type: {

        type: String,

        default: "TEXT",
      },

      incoming_message: {

        type: String,

        default: "",
      },

      whatsapp_message_id: {

        type: String,

        default: "",
      },

      language: {

        type: String,

        default: "EN",
      },

      raw_payload: {

        type: Object,
      },

    },

    {

      timestamps: true,
    }
  );


export const WhatsAppMessage =
  mongoose.model(

    "WhatsAppMessage",

    whatsappMessageSchema
  );