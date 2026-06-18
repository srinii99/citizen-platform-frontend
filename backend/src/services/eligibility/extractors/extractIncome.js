import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

export const extractIncome = (
  sentence = ""
) => {

  const rules = [];

  const text =
    sentence.toLowerCase();

  if (!text.includes("income")) {
    return rules;
  }

  // Match:
  // income should not exceed ₹100000
  // income must not exceed ₹8 lakhs
  // family income must not exceed ₹2 lakh

  const match =
    text.match(
      /income.*?(?:not exceed|less than|below|upto|up to)\s*₹?\s*([\d,]+)\s*(lakh|lakhs)?/
    );

  if (!match) {
    return rules;
  }

  let amount =
    Number(
      match[1].replace(/,/g, "")
    );

  if (match[2]) {
    amount *= 100000;
  }

  rules.push(
    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.INCOME,

      operator:
        OPERATORS.LESS_THAN_EQUAL,

      expectedValue:
        amount,

      source:
        sentence,

      extractor:
        "extractIncome",

    })
  );

  return rules;

};