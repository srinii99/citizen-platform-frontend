

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

      level:
        basic.level?.label || "",

      categories,

      beneficiaries,

      Description:
        content.briefDescription || "",

      detailedDescription:
        content.detailedDescription_md || "",

      benefits:
        content.benefits_md || "",



      eligibilityText:
        eligibility.eligibilityDescription_md || "",

      applicationUrl,

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

      sourceDataId:
        rawRecord._id,
    };

    return scheme;
  };




