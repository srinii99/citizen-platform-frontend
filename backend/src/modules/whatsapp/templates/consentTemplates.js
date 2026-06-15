export const getConsentMessage = () => ({
  type: "interactive",

  interactive: {
    type: "button",

    body: {
      text:
        "Before we continue, we need your consent to collect and process your information for scheme eligibility assessment and application processing.\n\nDo you agree?",
    },

    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "CONSENT_ACCEPT",
            title: "Accept",
          },
        },
        {
          type: "reply",
          reply: {
            id: "CONSENT_DECLINE",
            title: "Decline",
          },
        },
      ],
    },
  },
});