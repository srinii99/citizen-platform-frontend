import { Scheme } from "./scheme.model.js";

import { User }
from "../user/user.model.js";


// ✅ Get Schemes By Citizen State
export const getSchemes =
  async (req, res, next) => {

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
              "User not found"
          });
      }


   
      const schemes =
        await Scheme.find({

          $or: [

            // ✅ NEW SCHEMA
            {
              status: "ACTIVE"
            },

            // ✅ OLD SCHEMA
            {
              is_active: true
            }
          ]
        });
    
      

      return res.json({

        success: true,

        count:
          schemes.length,

        data:
          schemes
      });

    } catch (err) {

      next(err);
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

export const searchSchemes =
  async (req, res) => {

    try {

      const q =
        req.query.q || "";

      const schemes =
        await Scheme.find({

          status: "ACTIVE",

          $or: [

            {
              title: {
                $regex: q,
                $options: "i",
              },
            },

            {
              description: {
                $regex: q,
                $options: "i",
              },
            },

            {
              tags: {
                $regex: q,
                $options: "i",
              },
            },

            {
              categories: {
                $regex: q,
                $options: "i",
              },
            },
          ],
        })

        .limit(50);

      return res.json({

        success: true,

        count:
          schemes.length,

        data:
          schemes,
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        error:
          error.message,
      });
    }
  };


// ✅ Get Eligible Schemes
export const getEligibleSchemes =
  async (req, res, next) => {

    try {

      // 👤 Logged-in user profile
     
      const profile =
        await User.findById(
          req.user.user_id
        );

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
   
      const analyzedSchemes =
        schemes.map((scheme) => {

          const rules =
            scheme.eligibilityRules || {};

          const reasons = [];

          let eligible = true;


          // AGE

          if (
            profile.age <
              rules.min_age ||

            profile.age >
              rules.max_age
          ) {

            eligible = false;

            reasons.push(

              `Age must be between ${rules.min_age} and ${rules.max_age}`
            );
          }


          // GENDER

          if (

            rules.gender !== "ANY" &&

            profile.gender
              ?.trim()
              .toUpperCase() !==

            rules.gender
              ?.trim()
              .toUpperCase()
          ) {

            eligible = false;

            reasons.push(

              `Only ${rules.gender} applicants allowed`
            );
          }


          // INCOME

          if (
            profile.income >
            rules.max_income
          ) {

            eligible = false;

            reasons.push(

              `Income exceeds ₹${rules.max_income}`
            );
          }


          // STATE

          if (

            rules.state !== "ANY" &&

            profile.state
              ?.trim()
              .toUpperCase() !==

            rules.state
              ?.trim()
              .toUpperCase()
          ) {

            eligible = false;

            reasons.push(

              `Only citizens from ${rules.state} eligible`
            );
          }


          // CASTE

          if (

            rules.caste !== "ANY" &&

            profile.caste
              ?.trim()
              .toUpperCase() !==

            rules.caste
              ?.trim()
              .toUpperCase()
          ) {

            eligible = false;

            reasons.push(

              `Only ${rules.caste} category eligible`
            );
          }


        // OCCUPATION

      const profileOccupation =

        profile.occupation
          ?.trim()
          .toUpperCase() || "";

      const ruleOccupation =

        rules.occupation
          ?.trim()
          .toUpperCase() || "ANY";


      console.log({

        profileOccupation,

        ruleOccupation,
      });


      if (

        ruleOccupation !== "ANY" &&

        profileOccupation !==
        ruleOccupation
      ) {

        eligible = false;

        reasons.push(

          `Occupation must be ${rules.occupation}`
        );
      }
          
          // STUDENT

          if (

            rules.student_required &&

            !profile.is_student
          ) {

            eligible = false;

            reasons.push(
              "Only students eligible"
            );
          }


          // FARMER

          if (

            rules.farmer_required &&

            !profile.is_farmer
          ) {

            eligible = false;

            reasons.push(
              "Only farmers eligible"
            );
          }

                    // DISABILITY

          if (

            rules.disability_required &&

            !profile.is_disabled
          ) {

            eligible = false;

            reasons.push(
              "Disability certificate required"
            );
          }


          return {

            ...scheme.toObject(),

            eligible,

            reasons,
          };
        });




        return res.json({

        success: true,

        count:
          analyzedSchemes.length,

        data:
          analyzedSchemes
    });

    } catch (err) {

      next(err);
    }
  };
// -------------------------
// ADMIN CONTROLLERS
// -------------------------

// ✅ Get all schemes for admin
export const getAllSchemesAdmin =
  async (req, res) => {

    try {

      const schemes =
        await Scheme.find()
          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        success: true,

        data: schemes,
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error:
          err.message,
      });
    }
  };


// ✅ Create scheme
export const createScheme =
  async (req, res) => {

    try {

      console.log("CREATE SCHEME PAYLOAD:");
      console.log(JSON.stringify(req.body, null, 2));

      const scheme =
        await Scheme.create(
          req.body
        );
      

      return res.status(201).json({

        success: true,

        data: scheme,
      });

    } 
      catch (error) {
        console.error("CREATE SCHEME ERROR:");
        console.error(error);

        return res.status(500).json({
          success: false,
          error: error.message,
          stack: error.stack,
        });
      }
   
  };


// ✅ Update scheme
export const updateScheme =
  async (req, res) => {

    try {

      const scheme =
        await Scheme.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      return res.status(200).json({

        success: true,

        data: scheme,
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error:
          err.message,
      });
    }
  };


// ✅ Delete scheme
export const deleteScheme =
  async (req, res) => {

    try {

      await Scheme.findByIdAndDelete(
        req.params.id
      );

      return res.status(200).json({

        success: true,

        message:
          "Scheme deleted",
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error:
          err.message,
      });
    }
  };

export const getSchemeStats =
  async (req, res) => {

    try {

      const total =
        await Scheme.countDocuments();

      const myScheme =
        await Scheme.countDocuments({
          source: "MYSCHEME",
        });

      const manual =
        await Scheme.countDocuments({
          source: "MANUAL",
        });

      const apiSetu =
        await Scheme.countDocuments({
          source: "APISETU",
        });

      const active =
        await Scheme.countDocuments({
          status: "ACTIVE",
        });

      const categories =
        await Scheme.aggregate([
          { $unwind: "$categories" },

          {
            $group: {
              _id: "$categories",
              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },

          {
            $limit: 10,
          },
        ]);

      const recentSchemes =
        await Scheme.find()

          .sort({
            createdAt: -1,
          })

          .limit(5)

          .select(
            "title source createdAt"
          );

      return res.json({
        success: true,

        data: {
          total,
          myScheme,
          manual,
          apiSetu,
          active,
          categories,
          recentSchemes,
        },
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        error: error.message,
      });

    }
  };




