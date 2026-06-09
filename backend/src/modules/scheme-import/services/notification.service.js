export const sendNotification =
  async ({
    type,
    to,
    subject = "",
    message,
  }) => {

    try {

      console.log(`
========================
NOTIFICATION SENT
========================
TYPE: ${type}
TO: ${to}
SUBJECT: ${subject}
MESSAGE: ${message}
========================
`);

      // FUTURE:
      // WhatsApp API
      // SMS API
      // Email API
      // Push Notifications

      return true;

    } catch (err) {

      console.error(
        "Notification Error:",
        err
      );

      return false;
    }
  };


// -------------------------
// APPLICATION APPROVED
// -------------------------

export const sendApplicationApproved =
  async (
    mobile,
    schemeName
  ) => {

    return sendNotification({

      type: "WHATSAPP",

      to: mobile,

      message:
        `Your application for ${schemeName} has been APPROVED.`,
    });
  };


// -------------------------
// APPLICATION REJECTED
// -------------------------

export const sendApplicationRejected =
  async (
    mobile,
    schemeName
  ) => {

    return sendNotification({

      type: "WHATSAPP",

      to: mobile,

      message:
        `Your application for ${schemeName} has been REJECTED.`,
    });
  };


// -------------------------
// NEED MORE INFO
// -------------------------

export const sendNeedMoreInfo =
  async (
    mobile,
    schemeName
  ) => {

    return sendNotification({

      type: "WHATSAPP",

      to: mobile,

      message:
        `Additional information is required for your ${schemeName} application.`,
    });
  };