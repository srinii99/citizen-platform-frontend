import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractGender = (
  sentence = ""
) => {

  const rules = [];

  const genderMap = {

    female: "FEMALE",

    women: "FEMALE",

    woman: "FEMALE",

    girl: "FEMALE",

    male: "MALE",

    men: "MALE",

    man: "MALE",

    boy: "MALE",

    transgender:
      "TRANSGENDER",

  };

  const matches =
    matchKeywords(
      sentence,
      genderMap
    );

  if (
    matches.length === 0
  ) {
    return rules;
  }

  rules.push(

    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.GENDER,

      operator:
        OPERATORS.EQUALS,

      expectedValue:
        matches[0],

      source:
        sentence,

      extractor:
        "extractGender",

    })

  );

  return rules;

};