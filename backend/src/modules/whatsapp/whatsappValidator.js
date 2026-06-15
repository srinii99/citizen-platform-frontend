export const extractWhatsAppMessage =
  (payload) => {

    const entry =
      payload?.entry?.[0];

    const change =
      entry?.changes?.[0];

    const value =
      change?.value;

    const message =
      value?.messages?.[0];

    return {
      entry,
      change,
      value,
      message,
    };
  };