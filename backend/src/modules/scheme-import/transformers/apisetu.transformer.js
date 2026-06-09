export const transformApiSetu =
  (scheme) => {

    return {

      externalSchemeId:
        scheme.schemeCode,

      source:
        "APISETU",

      title:
        scheme.schemeTitle,

      description:
        scheme.description,

      department:
        scheme.department,

      ministry:
        scheme.department,

      benefits:
        "",

      status:
        "ACTIVE",
    };
};