import { Scheme } from "./scheme.model.js";
import { Profile } from "../profile/profile.model.js";

import {
  evaluateEligibility,
  calculateRecommendationScore,
} from "./eligibility.service.js";


// Get all schemes
export const getSchemes = async (
  req,
  res
) => {

  try {

    const schemes =
      await Scheme.find();

    res.json(schemes);

  } catch (err) {

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// Get eligible schemes
export const checkEligibility =
  async (req, res) => {

    try {

      console.log(
        "REQ USER:",
        req.user
      );

      const profile =
        await Profile.findOne({
          user_id:
            req.user.user_id,
        });

      console.log(
        "PROFILE:",
        profile
      );

      if (!profile) {

        return res.status(404).json({
          success: false,
          message:
            "Citizen profile not found",
        });
      }

      const schemes =
        await Scheme.find({
          is_active: true,
        });

      const eligibleSchemes =
        schemes
          .map((scheme) => {

            const rules =
              scheme.eligibility_rules;

            const result =
              evaluateEligibility(
                profile,
                rules
              );

            console.log({
              scheme:
                scheme.name,
              rules,
              result,
            });

            if (
              !result.isEligible
            ) {
              return null;
            }

            return {
              _id: scheme._id,

              name:
                scheme.name,

              category:
                scheme.category,

              description:
                scheme.description,

              recommendation_score:
                calculateRecommendationScore(
                  profile,
                  rules
                ),

              eligibility_details:
                result,
            };
          })

          .filter(Boolean)

          .sort(
            (a, b) =>
              b.recommendation_score -
              a.recommendation_score
          );

      return res.status(200).json({
        success: true,
        count:
          eligibleSchemes.length,
        data:
          eligibleSchemes,
      });

    } catch (err) {

      console.error(
        "Eligibility Error:",
        err
      );

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };


// Get scheme by ID
export const getSchemeById =
  async (req, res) => {

    try {

      const scheme =
        await Scheme.findById(
          req.params.id
        );

      if (!scheme) {

        return res.status(404).json({
          success: false,
          message:
            "Scheme not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: scheme,
      });

    } catch (err) {

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };