
import { User }
from "../user/user.model.js";

import { Scheme }
from "../scheme/scheme.model.js";

import { Application }
from "../application/application.model.js";

export const getAdminDashboardStats =
  async (req, res) => {

    try {

      // -------------------------
      // COUNTS
      // -------------------------

      const totalCitizens =
        await User.countDocuments({
          role: "USER",
        });

      const totalSchemes =
        await Scheme.countDocuments();

      const totalApplications =
        await Application.countDocuments();

      const approvedApplications =
        await Application.countDocuments({
          status: "APPROVED",
        });

      // -------------------------
      // RESPONSE
      // -------------------------

      return res.status(200).json({

        success: true,

        data: {

          totalCitizens,

          totalSchemes,

          totalApplications,

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