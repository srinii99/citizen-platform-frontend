import { detectSchemeState }
from "./modules/scheme/utils/stateDetector.js";

console.log(
  detectSchemeState({
    description:
      "Government of Odisha Farmer Welfare Scheme"
  })
);

console.log(
  detectSchemeState({
    description:
      "Government of Karnataka Agriculture Scheme"
  })
);

console.log(
  detectSchemeState({
    description:
      "Ministry of Agriculture and Farmers Welfare Government of India"
  })
);