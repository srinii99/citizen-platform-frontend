import WhatsAppMessage
from "./whatsappMessage.model.js";

export const getConversationHistory =
  async (phoneNumber) => {

    return await WhatsAppMessage
      .find({
        phoneNumber,
      })
      .sort({
        createdAt: 1,
      });
  };