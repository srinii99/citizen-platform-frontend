const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export const detectSchemeState = (scheme) => {

  const searchableText = `
    ${scheme.title || ""}
    ${scheme.description || ""}
    ${scheme.detailedDescription || ""}
    ${scheme.eligibility || ""}
    ${scheme.department || ""}
    ${scheme.officialWebsite || ""}
  `.toLowerCase();

  for (const state of STATES) {

    if (
      searchableText.includes(
        state.toLowerCase()
      )
    ) {
      return state;
    }
  }

  return null;
};