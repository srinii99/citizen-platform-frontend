import mongoose from "mongoose";

const whatsappMessageSchema =
  new mongoose.Schema(

    {

      phoneNumber: {

        type: String,

        required: true,
      },

      direction: {

        type: String,

        enum: [
          "inbound",
          "outbound",
        ],

        required: true,
      },

      message: {

        type: String,

        required: true,
      },

      status: {

        type: String,

        default: "received",
      },

    },

    {

      timestamps: true,
    }
  );

  whatsappMessageSchema.index({
    phoneNumber: 1,
  });

  whatsappMessageSchema.index({
    createdAt: 1,
  });

  whatsappMessageSchema.index({
    phoneNumber: 1,
    createdAt: 1,
  });

export default mongoose.model(
  "WhatsAppMessage",
  whatsappMessageSchema
);