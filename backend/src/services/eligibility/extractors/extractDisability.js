import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractDisability = (
  sentence = ""
) => {

  const rules = [];

  const disabilityMap = {

    disability: true,

    disabled: true,

    pwd: true,

    "person with disability": true,

    "persons with disabilities": true,

    handicapped: true,

    divyang: true,

  };

  const matches =
    matchKeywords(
      sentence,
      disabilityMap
    );

  if (matches.length === 0) {

    return rules;

  }

  rules.push(

    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.DISABILITY,

      operator:
        OPERATORS.EQUALS,

      expectedValue:
        true,

      source:
        sentence,

      extractor:
        "extractDisability",

    })

  );

  return rules;

};