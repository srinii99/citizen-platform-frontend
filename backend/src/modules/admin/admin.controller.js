import { Application }
from "../application/application.model.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";


import {
  sendApplicationApproved,
  sendApplicationRejected,
  sendNeedMoreInfo,
} from "../scheme-import/services/notification.service.js";

import {
  WORKFLOW_RULES,
} from "../../constants/workflowRules.js";


// -------------------------
// GET ALL APPLICATIONS
// -------------------------

export const getAllApplications =
  async (req, res, next) => {

    try {

      const applications =
        await Application.find()

          .populate("scheme_id")

          .populate("user_id")

          .sort({
            created_at: -1,
          });

      return successResponse(
        res,
        applications,
        "Applications fetched successfully"
      );

    } catch (err) {

      next(err);
    }
  };


// -------------------------
// UPDATE APPLICATION STATUS
// -------------------------


export const updateApplicationStatus =
  async (req, res, next) => {

    try {

      const {
        status,
        remarks,
        govt_department,
        govt_reference_number,
      } = req.body;

      // ✅ FIND APPLICATION

      const application =
        await Application.findById(
          req.params.id
        )
        .populate("user_id")
        .populate("scheme_id");

      if (!application) {

        return errorResponse(
          res,
          "Application not found",
          null,
          404
        );
      }

      // ✅ CURRENT STATUS

      const currentStatus =
        application.status;

      // ✅ WORKFLOW RULES

      const allowedTransitions =
        WORKFLOW_RULES[
          currentStatus
        ] || [];

      const isValidTransition =
        allowedTransitions.includes(
          status
        );

      if (!isValidTransition) {

        return errorResponse(

          res,

          `Invalid workflow transition from ${currentStatus} to ${status}`,

          null,

          400
        );
      }

      // ✅ UPDATE STATUS

      application.status =
        status;

      // ✅ ADMIN REMARKS

      application.admin_remarks =
        remarks || "";

      // ✅ GOVT HANDOFF SUPPORT

      if (
        status ===
        "FORWARDED_TO_GOVT"
      ) {

        application.govt_department =
          govt_department || "";

        application.govt_reference_number =
          govt_reference_number || "";

        application.forwarded_to_govt_at =
          new Date();

        application.govt_status =
          "PENDING";
      }

      // ✅ STATUS HISTORY

      application.status_history.push({

        status,

        admin_remarks:
          remarks || "",

        updated_at:
          new Date(),
      });

      // ✅ SAVE

      await application.save();

      // ✅ NOTIFICATIONS

      const mobile =
        application.user_id?.mobile || "";

      const schemeName =
        application.scheme_id?.title || "scheme";


      if (status === "APPROVED") {

        await sendApplicationApproved(
          mobile,
          schemeName
        );
      }


      if (status === "REJECTED") {

        await sendApplicationRejected(
          mobile,
          schemeName
        );
      }


      if (
        status ===
        "NEEDS_MORE_INFO"
      ) {

        await sendNeedMoreInfo(
          mobile,
          schemeName
        );
      }

      return successResponse(

        res,

        application,

        "Application updated successfully"
      );

    } catch (err) {

      next(err);
    }
  };