export const getGenderSelectionMessage =
  () => ({
    type: "interactive",

    interactive: {
      type: "button",

      body: {
        text:
          "Please select your gender.",
      },

      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: "GENDER_MALE",
              title: "Male",
            },
          },
          {
            type: "reply",
            reply: {
              id: "GENDER_FEMALE",
              title: "Female",
            },
          },
          {
            type: "reply",
            reply: {
              id: "GENDER_OTHER",
              title: "Other",
            },
          },
        ],
      },
    },
  });

