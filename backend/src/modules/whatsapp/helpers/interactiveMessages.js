export const buildViewSchemesButton =
  (schemeCount) => {

    return {

      type: "interactive",

      interactive: {

        type: "button",

        body: {

          text:
            `🎯 Found ${schemeCount} eligible schemes.\n\nBrowse available schemes.`,
        },

        action: {

          buttons: [

            {
              type: "reply",

              reply: {

                id:
                  "VIEW_SCHEMES",

                title:
                  "View Schemes",
              },
            },
          ],
        },
      },
    };
  };