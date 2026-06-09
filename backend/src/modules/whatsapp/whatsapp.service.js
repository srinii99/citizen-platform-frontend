import axios
from "axios";


const TOKEN =
  process.env
    .WHATSAPP_TOKEN;

const PHONE_NUMBER_ID =
  process.env
    .WHATSAPP_PHONE_NUMBER_ID;


// -------------------------
// SEND WHATSAPP MESSAGE
// -------------------------

export const sendWhatsAppMessage =
  async (

    to,

    message
  ) => {

    try {

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