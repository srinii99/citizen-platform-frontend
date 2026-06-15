import { detectSchemeState }
from "../../scheme/utils/stateDetector.js";

export const transformMySchemeRecord =
  async (rawRecord) => {



    const data = rawRecord.rawData?.en;

    if (!data) {
      throw new Error(
        "English data not found"
      );
    }

    const basic =
      data.basicDetails || {};

    const content =
      data.schemeContent || {};

    const eligibility =
      data.eligibilityCriteria || {};

    const application =
      data.applicationProcess || [];

    const categories =
      (basic.schemeCategory || [])
        .map(c => c.label);

    const beneficiaries =
      (basic.targetBeneficiaries || [])
        .map(b => b.label);

    const applicationUrl =
      application?.[0]?.url || "";

    const officialWebsite =
      content.references?.find(
        ref => ref.url
      )?.url || "";

    const detectedState =
      detectSchemeState({

        title:
          basic.schemeName || "",

        description:
          content.briefDescription || "",

        detailedDescription:
          content.detailedDescription_md || "",

        eligibility:
          eligibility.eligibilityDescription_md || "",

        department:
          basic.nodalDepartmentName?.label || "",

        officialWebsite
      });

    if (detectedState) {
      console.log(
        `[STATE DETECTED] ${
          basic.schemeName
        } -> ${detectedState}`
      );
    }

    console.log({
      title: basic.schemeName,
      detectedState,
    });

    const scheme = {
      source: "MYSCHEME",




      sourceSchemeId:
        rawRecord.schemeId,

      slug:
        rawRecord.slug,


      title:
        basic.schemeName || "",

      shortTitle:
        basic.schemeShortTitle || "",

      ministry:
        basic.nodalMinistryName?.label || "",

      department:
        basic.nodalDepartmentName?.label || "",


      categories,

      beneficiaries,


      description:
        content.briefDescription || "",

      detailedDescription:
        content.detailedDescription_md || "",

      benefits:
        content.benefits_md || "",


      eligibility:
        eligibility.eligibilityDescription_md || "",

      applicationUrl,

      officialWebsite,

        // NEW

      schemeScope:
        detectedState
          ? "STATE"
          : "CENTRAL",

      applicableStates:
        detectedState
          ? [detectedState]
          : [],

      tags:
        basic.tags || [],

      schemeOpenDate:
        basic.schemeOpenDate
          ? new Date(
              basic.schemeOpenDate
            )
          : null,

      schemeCloseDate:
        basic.schemeCloseDate
          ? new Date(
              basic.schemeCloseDate
            )
          : null,
    


  
    };

    return scheme;
  };




