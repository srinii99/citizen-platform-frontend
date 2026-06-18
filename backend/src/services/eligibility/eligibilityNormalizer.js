import { extractors }
from "./extractors/index.js";

export const normalizeEligibility = (
  eligibilityText = ""
) => {

  const rules = [];

  if (!eligibilityText) {
    return rules;
  }

  const sentences = eligibilityText
    .split("\n")
    .map(line => line.trim())
    .filter(Boolean);

  for (const sentence of sentences) {

    console.log("Processing:", sentence);

    for (const extractor of extractors) {

      rules.push(
        ...extractor(sentence)
      );

    }

  }

  return rules;

};