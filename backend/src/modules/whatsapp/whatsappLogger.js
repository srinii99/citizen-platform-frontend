export const whatsappLog =
  (...args) => {

    console.log(
      "[WHATSAPP]",
      ...args
    );
  };

export const whatsappError =
  (...args) => {

    console.error(
      "[WHATSAPP ERROR]",
      ...args
    );
  };