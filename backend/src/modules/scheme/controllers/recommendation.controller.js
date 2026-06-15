import { Profile }
from "../../profile/profile.model.js";

import {
  getRecommendedSchemes
}
from "../services/recommendation.service.js";

export const getRecommendations =
async (req, res) => {

  try {

    const profile =
      await Profile.findOne({
        user_id: req.user.user_id,
      });

    if (!profile) {

      return res.status(404)
        .json({
          success: false,
          message: "Profile not found",
        });
    }

    const schemes =
      await getRecommendedSchemes(
        profile
      );

    return res.json({
      success: true,
      count: schemes.length,
      schemes,
    });

  } catch (error) {

    console.error(error);

    return res.status(500)
      .json({
        success: false,
        message:
          "Failed to fetch recommendations",
      });
  }
};