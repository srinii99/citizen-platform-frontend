import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

export const extractResidenceDuration = (
  sentence = ""
) => {

  const rules = [];

  const text =
    sentence.toLowerCase();

  let match = null;

  // -------------------------
  // minimum 5 years
  // -------------------------

  match = text.match(
    /minimum\s+(\d+)\s+years?/
  );

  if (!match) {

    // at least 5 years

    match = text.match(
      /at\s+least\s+(\d+)\s+years?/
    );

  }

  if (!match) {

    // resident for 5 years

    match = text.match(
      /(?:resident|residence).*?(\d+)\s+years?/
    );

  }

  if (!match) {

    // 5 years residence

    match = text.match(
      /(\d+)\s+years?.*residence/
    );

  }

  if (!match) {

    return rules;

  }

  rules.push(

    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.RESIDENCE_YEARS,

      operator:
        OPERATORS.GREATER_THAN_EQUAL,

      expectedValue:
        Number(match[1]),

      source:
        sentence,

      extractor:
        "extractResidenceDuration",

    })

  );

  return rules;

};