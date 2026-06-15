import { Scheme }
from "../scheme.model.js";

export const getRecommendedSchemes =
async (profile) => {

  console.log("=================================");
  console.log("PROFILE RECEIVED");
  console.log(JSON.stringify(profile, null, 2));
  console.log("=================================");

  
  
  const safeText = (value) => {

      if (!value) return "";

      if (typeof value === "string") {
        return value.toLowerCase();
      }

      if (Array.isArray(value)) {
        return value.join(" ").toLowerCase();
      }

      return JSON.stringify(value)
        .toLowerCase();

  };


  const buildSearchText = (scheme) => {

      return [

        safeText(scheme.title),

        safeText(scheme.description),

        safeText(scheme.eligibility),

        safeText(scheme.benefits),

        safeText(scheme.tags),

        safeText(scheme.categories),

        safeText(scheme.beneficiaries)

      ]
        .join(" ");

  };  
  


  const {
    gender,
    state,
    occupation,
    occupation_category,
    caste,
    caste_category,
    age,
    is_student,
    bpl_status,
    minority_status,
    pwd_status
  } = profile;

  const schemes =
    await Scheme.find({
      status: "ACTIVE"
    }).lean();

  console.log(
    "Total Schemes:",
    schemes.length
  );

  let filteredCount = 0;

  const scoredSchemes = [];

  for (const scheme of schemes) {

    // STATE FILTER

    if (
      scheme.schemeScope === "STATE"
    ) {

      const schemeStates =
        (scheme.applicableStates || [])
          .map(s => s.toUpperCase());

      const userState =
        state?.toUpperCase();

      if (
        !userState ||
        !schemeStates.includes(userState)
      ) {

        filteredCount++;

        continue;

      }
    }


    let score = 0;

    const text =
      buildSearchText(
        scheme
      );


    // Farmer matching

    if (
      occupation_category === "FARMER" ||
      occupation === "FARMER"
    ) {

      const farmerKeywords = [
        "farmer",
        "farmers",
        "farming",
        "agriculture",
        "agricultural",
        "horticulture",
        "livestock",
        "dairy",
        "fishery",
        "fisheries",
        "crop",
        "cultivation"
      ];

      const matches =
        farmerKeywords.filter(
          keyword => text.includes(keyword)
        ).length;

      score += matches * 10;
    }


  

    // Gender

    if (
      gender?.toUpperCase() === "FEMALE"
    ) {

      if (
        text.includes("woman") ||
        text.includes("women") ||
        text.includes("female")
      ) {
        score += 20;
      }

    }

    // Occupation

    if (
      occupation
    ) {

      if (
        text.includes(
          occupation.toLowerCase()
        )
      ) {
        score += 20;
      }

    }

    // Caste

    if (
      caste_category
    ) {

      if (
        text.includes(
          caste_category.toLowerCase()
        )
      ) {
        score += 15;
      }

    }

    // Age

    const minAge =
      scheme.eligibilityRules?.min_age || 0;

    const maxAge =
      scheme.eligibilityRules?.max_age || 120;

    if (
      age >= minAge &&
      age <= maxAge
    ) {
      score += 20;
    }

    if (score > 0) {

      scoredSchemes.push({
        ...scheme,
        recommendationScore: score,
      });

    }

  }

  console.log(
    "Filtered Out:",
    filteredCount
  );

  console.log(
    "Eligible Schemes:",
    schemes.length - filteredCount
  );

  console.log(
    "Recommended:",
    scoredSchemes.length
  );

  return scoredSchemes
    .sort(
      (a, b) =>
        b.recommendationScore -
        a.recommendationScore
    )
    .slice(0, 20);
};