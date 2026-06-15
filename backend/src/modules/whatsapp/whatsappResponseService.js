import {
  sendWhatsAppMessage,
  sendWhatsAppInteractiveMessage,
} from "./whatsapp.service.js";

export const sendWhatsAppResponse =
  async (
    phoneNumber,
    payload
  ) => {

    if (!payload) {
      return;
    }

    // Text Message
    if (
      payload.type === "text"
    ) {

      return await sendWhatsAppMessage(
        phoneNumber,
        payload.text.body
      );
    }

    // Interactive Message
    if (
      payload.type === "interactive"
    ) {

      return await sendWhatsAppInteractiveMessage(
        phoneNumber,
        payload
      );
    }

    console.log(
      "[WHATSAPP] Unsupported payload type:",
      payload.type
    );
  };