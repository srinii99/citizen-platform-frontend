import { User }
from "./user.model.js";

import {

  calculateProfileCompletion,

} from "../../utils/profileCompletion.js";


// -------------------------
// GET PROFILE
// -------------------------

export const getProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.user_id
        );
    
      const profileData =

        calculateProfileCompletion(
          user
        );


      user.profile_completion_percentage =

        profileData.percentage;


      await user.save();


      return res.status(200).json({

        success: true,

        data: user,
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error: err.message,
      });
    }
  };


// -------------------------
// UPDATE PROFILE
// -------------------------

export const updateProfile =
  async (req, res) => {

    try {

      const user =
        await User.findById(
          req.user.user_id
        );

      if (!user) {

        return res.status(404)
          .json({

            success: false,

            message:
              "User not found",
          });
      }


      // -------------------------
      // UPDATE FIELDS
      // -------------------------

      Object.keys(req.body)
        .forEach((key) => {

          user[key] =
            req.body[key];
        });


      // -------------------------
      // PROFILE COMPLETION
      // -------------------------

      const profileData =

        calculateProfileCompletion(
          user
        );


      user.profile_completion_percentage =

        profileData.percentage;


      // -------------------------
      // PROFILE STATUS
      // -------------------------

      user.profile_completed =

        profileData.percentage >= 80;


      await user.save();


      return res.status(200)
        .json({

          success: true,

          data: user,

          profile_completion_percentage:
            profileData.percentage,

          missing_fields:
            profileData.missingFields,
        });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error:
            err.message,
      });
    }
  };

export const updateConsent =
  async (req, res) => {

    try {

      const {

        accepted,

      } = req.body;


      const user =
        await User.findById(
          req.user.user_id
        );

      if (!user) {

        return res.status(404)
          .json({

            success: false,

            message:
              "User not found",
          });
      }


      // -------------------------
      // UPDATE CONSENT
      // -------------------------

      user.consent = {

        accepted,

        accepted_at:
          accepted
            ? new Date()
            : null,

        consent_version:
          "v1",

        ip_address:
          req.ip || "",
      };


      await user.save();


      return res.status(200)
        .json({

          success: true,

          data:
            user.consent,
        });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error:
            err.message,
      });
    }
  };