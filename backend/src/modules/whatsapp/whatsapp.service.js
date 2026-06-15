import axios
from "axios";

import { whatsappConfig }
from "./whatsapp.config.js";

import WhatsAppMessage
from "./whatsappMessage.model.js";



const TOKEN =
  whatsappConfig.accessToken;

const PHONE_NUMBER_ID =
  whatsappConfig.phoneNumberId;


// -------------------------
// SEND WHATSAPP MESSAGE
// -------------------------

export const sendWhatsAppMessage =
  async (

    to,

    message
  ) => {

    if (!TOKEN || !PHONE_NUMBER_ID) {

      await WhatsAppMessage.create({

        phoneNumber:
          to,

        direction:
          "outbound",

        message,

        status:
          "mocked",
      });



      console.log(
        "[WHATSAPP] Outbound message saved"
      );

      console.log(
        "[WHATSAPP] Would send:",
        {
          to,
          message,
        }
      );

      return;
    }

    try {

      console.log(
        "TOKEN:",
        TOKEN
      );

      console.log(
        "PHONE_NUMBER_ID:",
        PHONE_NUMBER_ID
      );

      await axios.post(

        `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,

        {

          messaging_product:
            "whatsapp",

          to,

          type: "text",

          text: {

            body:
              message,
          },
        },

        {

          headers: {

            Authorization:
              `Bearer ${TOKEN}`,

            "Content-Type":
              "application/json",
          },
        }
      );

    } catch (err) {

      console.error(

        "WhatsApp Send Error:",

        err.response?.data ||

        err.message
      );
    }
  };

export const sendWhatsAppInteractiveMessage =
  async (
    to,
    interactivePayload
  ) => {

    if (
      !TOKEN ||
      !PHONE_NUMBER_ID
    ) {

      await WhatsAppMessage.create({

        phoneNumber: to,

        direction: "outbound",

        message: JSON.stringify(
          interactivePayload
        ),

        status: "mocked",
      });

      console.log(
        "[WHATSAPP INTERACTIVE MOCK]",
        {
          to,
          interactivePayload,
        }
      );

      return;
    }

    try {

      await axios.post(

        `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,

        {

          messaging_product:
            "whatsapp",

          recipient_type:
            "individual",

          to,

          type:
            "interactive",

          interactive:
            interactivePayload.interactive,
        },

        {

          headers: {

            Authorization:
              `Bearer ${TOKEN}`,

            "Content-Type":
              "application/json",
          },
        }
      );

      await WhatsAppMessage.create({

        phoneNumber: to,

        direction: "outbound",

        message: JSON.stringify(
          interactivePayload
        ),

        status: "sent",
      });

    } catch (err) {

      console.error(

        "WhatsApp Interactive Error:",

        err.response?.data ||

        err.message
      );
    }
  };