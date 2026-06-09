import { Scheme }
from "../scheme/scheme.model.js";

import { Application }
from "../application/application.model.js";

export const getDashboardStats =
  async (req, res) => {

    try {

      const userId =
        req.user.user_id;

      // -------------------------
      // APPLICATIONS
      // -------------------------

      const applications =
        await Application.find({
          user_id: userId,
        });

      const totalApplications =
        applications.length;

      const approvedApplications =
        applications.filter(
          (app) =>
            app.status ===
            "APPROVED"
        ).length;

      // -------------------------
      // ELIGIBLE SCHEMES
      // -------------------------

      const eligibleSchemes =
        await Scheme.countDocuments({
          status: "ACTIVE",
        });

      // -------------------------
      // RESPONSE
      // -------------------------

      return res.status(200).json({

        success: true,

        data: {

          eligibleSchemes,

          applications:
            totalApplications,

          approved:
            approvedApplications,
        },
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error:
          err.message,
      });
    }
  };