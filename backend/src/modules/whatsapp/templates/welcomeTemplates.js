export const getLanguageSelectionMessage =
  () => ({
    type: "interactive",

    interactive: {
      type: "button",

      body: {
        text:
          "🙏 Welcome to SetuNxt.\n\nPlease select your preferred language.",
      },

      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "LANG_EN",
              title: "English",
            },
          },
          {
            type: "reply",
            reply: {
              id: "LANG_HI",
              title: "हिन्दी",
            },
          },
          {
            type: "reply",
            reply: {
              id: "LANG_KN",
              title: "ಕನ್ನಡ",
            },
          },
        ],
      },
    },
  });