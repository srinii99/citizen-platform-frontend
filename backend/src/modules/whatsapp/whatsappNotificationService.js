import { Application }
from "../application/application.model.js";

import { User }
from "../user/user.model.js";

import {
  sendWhatsAppMessage,
} from "./whatsapp.service.js";

export const sendApplicationNotification =
  async (
    applicationId
  ) => {

    const application =
      await Application
        .findById(applicationId)
        .populate("scheme_id")
        .populate("user_id");

    if (!application) {
      return;
    }

    const mobile =
      application.user_id?.mobile;

    if (!mobile) {
      return;
    }

    let message = "";

    switch (application.status) {

      case "SUBMITTED":

        message =
`✅ Application Submitted

Scheme:
${application.scheme_id?.title}

Application ID:
${application._id}

Our team will review your application shortly.`;

        break;

      case "UNDER_REVIEW":

        message =
`🔍 Application Under Review

Scheme:
${application.scheme_id?.title}

Our team is reviewing your documents.`;

        break;

      case "APPROVED":

        message =
`🎉 Application Approved

Scheme:
${application.scheme_id?.title}

Congratulations! Your application has been approved.`;

        break;

      case "REJECTED":

        message =
`❌ Application Rejected

Scheme:
${application.scheme_id?.title}

Remarks:
${application.admin_remarks || "N/A"}`;

        break;

      case "NEEDS_MORE_INFO":

        message =
`📄 More Documents Required

Scheme:
${application.scheme_id?.title}

Remarks:
${application.admin_remarks || "Please upload requested documents."}`;

        break;

      default:
        return;
    }

    await sendWhatsAppMessage(
      mobile,
      message
    );
  };