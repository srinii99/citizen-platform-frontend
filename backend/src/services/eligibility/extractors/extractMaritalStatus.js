import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractMaritalStatus = (
  sentence = ""
) => {

  const rules = [];

  const maritalStatusMap = {

    widow: "WIDOW",

    widows: "WIDOW",

    widowed: "WIDOW",

    married: "MARRIED",

    unmarried: "SINGLE",

    single: "SINGLE",

    bachelor: "SINGLE",

    spinster: "SINGLE",

    divorced: "DIVORCED",

    divorcee: "DIVORCED",

  };

  const matches =
    matchKeywords(
      sentence,
      maritalStatusMap
    );

  if (matches.length === 0) {

    return rules;

  }

  rules.push(

    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.MARITAL_STATUS,

      operator:
        OPERATORS.EQUALS,

      expectedValue:
        matches[0],

      source:
        sentence,

      extractor:
        "extractMaritalStatus",

    })

  );

  return rules;

};