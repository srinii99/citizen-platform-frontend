import { Scheme } from "./scheme.model.js";

import { User }
from "../user/user.model.js";


import {
  evaluateEligibility,
} from "./eligibility.service.js";

export const getRecommendedSchemes =
  async (req, res) => {

    try {

      const { citizenId } =
        req.params;

      // -------------------------
      // FETCH CITIZEN
      // -------------------------

      const citizen =
        await User.findById(
          citizenId
        );

      if (!citizen) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Citizen not found",
          });
      }

      // -------------------------
      // FETCH ACTIVE SCHEMES
      // -------------------------

      const schemes =
        await Scheme.find({
          status: "ACTIVE",
        });

      const eligible = [];

      const partiallyMatched =
        [];

      const notEligible = [];

      // -------------------------
      // EVALUATE EACH SCHEME
      // -------------------------

      for (const scheme of schemes) {

        const result =
          evaluateEligibility(
            citizen,
            scheme.eligibility
          );

        const response =
          {
            schemeId:
              scheme._id,

            title:
              scheme.title,

            department:
              scheme.department,

            benefits:
              scheme.benefits,

            application_fee:
              scheme.application_fee,

            eligibility:
              result.isEligible,

            reasons:
              result.reasons,

            score:
              result.score,

            matchPercentage:
              result.matchPercentage,
          };

        // -------------------------
        // CATEGORIZATION
        // -------------------------

        if (
          result.isEligible
        ) {

          eligible.push(
            response
          );

        } else if (
          result.matchPercentage >=
          10
        ) {

          partiallyMatched.push(
            response
          );

        } else {

          notEligible.push(
            response
          );
        }
      }

      // -------------------------
      // SORT BY SCORE
      // -------------------------

      const sortByScore =
        (a, b) =>
          b.score - a.score;

      eligible.sort(
        sortByScore
      );

      partiallyMatched.sort(
        sortByScore
      );

      notEligible.sort(
        sortByScore
      );

      // -------------------------
      // FINAL RESPONSE
      // -------------------------

      return res.status(200).json(
        {
          success: true,

          citizen: {
            id: citizen._id,
            name:
              citizen.name,
          },

          summary: {
            eligible:
              eligible.length,

            partiallyMatched:
              partiallyMatched.length,

            notEligible:
              notEligible.length,
          },

          data: {
            eligible,

            partiallyMatched,

            notEligible,
          },
        }
      );

    } catch (error) {

      console.log(error);

      return res
        .status(500)
        .json({
          success: false,
          message:
            "Server Error",
        });
    }
  };