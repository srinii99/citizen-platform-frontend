import { Scheme } from "./scheme.model.js";

import { Profile }
  from "../profile/profile.model.js";


// ✅ Get all schemes
export const getSchemes =
  async (req, res) => {

    try {

      const schemes =
        await Scheme.find();

      res.json(schemes);

    } catch (err) {

      res.status(500).json({

        success: false,

        error: err.message
      });
    }
  };


// ✅ Get scheme by ID
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
            "Scheme not found"
        });
      }

      return res.status(200).json({

        success: true,

        data: scheme
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error: err.message
      });
    }
  };


// ✅ Get Eligible Schemes
export const getEligibleSchemes =
  async (req, res, next) => {

    try {

      // 👤 Logged-in user profile
      const profile =
        await Profile.findOne({

          user_id:
            req.user.user_id
        });

      if (!profile) {

        throw new Error(
          "Profile not found"
        );
      }

      // 📋 Active schemes
      const schemes =
        await Scheme.find({

          status: "ACTIVE"
        });

      console.log("PROFILE:");

      console.log(profile);

      console.log("SCHEMES:");

      console.log(
        JSON.stringify(
          schemes,
          null,
          2
        )
      );

      // ✅ Eligibility matching
      const eligibleSchemes =
        schemes.filter((scheme) => {

          const rules =
            scheme.eligibility;

          // Age
          if (
            profile.age <
              rules.min_age ||

            profile.age >
              rules.max_age
          ) {

            console.log(
              "FAILED AGE"
            );

            return false;
          }

          // Gender
          if (

            rules.gender !== "ANY" &&

            profile.gender
              ?.trim()
              .toUpperCase() !==

            rules.gender
              ?.trim()
              .toUpperCase()
          ) {

            console.log(
              "FAILED GENDER"
            );

            return false;
          }

          // Income
          if (
            profile.income >
            rules.max_income
          ) {

            console.log(
              "FAILED INCOME"
            );

            return false;
          }

          // State
          if (

            rules.state !== "ANY" &&

            profile.state
              ?.trim()
              .toUpperCase() !==

            rules.state
              ?.trim()
              .toUpperCase()
          ) {

            console.log(
              "FAILED STATE"
            );

            return false;
          }

          // Caste
          if (

            rules.caste !== "ANY" &&

            profile.caste
              ?.trim()
              .toUpperCase() !==

            rules.caste
              ?.trim()
              .toUpperCase()
          ) {

            console.log(
              "FAILED CASTE"
            );

            return false;
          }


          // Occupation

          console.log(
            "PROFILE OCC:",
            profile.occupation
          );

          console.log(
            "RULE OCC:",
            rules.occupation
          );

          console.log(
            "PROFILE OCC NORMALIZED:",
            profile.occupation
              ?.trim()
              .toUpperCase()
          );

          console.log(
            "RULE OCC NORMALIZED:",
            rules.occupation
              ?.trim()
              .toUpperCase()
          );

          if (

            rules.occupation !==
              "ANY" &&

            profile.occupation
              ?.trim()
              .toUpperCase() !==

            rules.occupation
              ?.trim()
              .toUpperCase()
          )
          {
            console.log(
              "FAILED OCCUPATION"
            );

            return false;
          }

          console.log(
            "SCHEME MATCHED"
          );

          return true;
        });

      res.json({

        success: true,

        count:
          eligibleSchemes.length,

        data:
          eligibleSchemes
      });

    } catch (err) {

      next(err);
    }
  };