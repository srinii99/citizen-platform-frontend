import { Scheme }
from "../scheme/scheme.model.js";

export const getEligibleSchemesForWhatsAppUser =
  async (session) => {

    const schemes =
      await Scheme.find({
        status: "ACTIVE",
      });

    console.log(
        "SAMPLE RULES:",
        JSON.stringify(
            schemes[0]?.eligibilityRules,
            null,
            2
        )
    );

    const age =
      new Date().getFullYear() -
      Number(
        session.profileData
          ?.dateOfBirth
          ?.split("/")
          ?.[2]
      );

    const income =
      session.profileData
        ?.annualIncome || 0;

    const state =
      session.profileData
        ?.state || "";

    const gender =
      session.profileData
        ?.gender || "";

    const occupation =
      session.profileData
        ?.occupation || "";

    return schemes.filter(
      (scheme) => {

        const rules =
          scheme.eligibilityRules || {};

        if (
          !scheme.eligibilityRules ||
          Object.keys(rules).length === 0
        ) {
          return false;
        }

        if (
          rules.min_age &&
          age < rules.min_age
        ) {
          return false;
        }

        if (
          rules.max_age &&
          age > rules.max_age
        ) {
          return false;
        }

        if (
          rules.max_income &&
          income > rules.max_income
        ) {
          return false;
        }

        if (
          rules.gender &&
          rules.gender !== "ANY" &&
          rules.gender !== gender
        ) {
          return false;
        }

        if (
          rules.state &&
          rules.state !== "ANY" &&
          rules.state !== state
        ) {
          return false;
        }

        if (
          rules.occupation &&
          rules.occupation !== "ANY" &&
          rules.occupation.toUpperCase() !== occupation
        ) {
          return false;
        }

   
        if (
          occupation === "FARMER"
        ) {

          const isAgricultureScheme =

            scheme.categories?.some(
              (c) =>
                c
                  .toUpperCase()
                  .includes("AGRICULTURE")
            ) ||

            scheme.tags?.some(
              (t) =>
                t
                  .toUpperCase()
                  .includes("FARM")
            ) ||

            scheme.description
              ?.toUpperCase()
              .includes("FARM");

          if (!isAgricultureScheme) {
            return false;
          }
        }

        return true;
      }
    );
  };