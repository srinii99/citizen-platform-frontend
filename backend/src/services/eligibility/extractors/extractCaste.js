import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractCaste = (
  sentence = ""
) => {

  const rules = [];

  const text =
    sentence.toLowerCase();

  // -------------------------
  // SC/ST together
  // -------------------------

  if (
    /\bsc\s*\/\s*st\b/i.test(sentence)
  ) {

    rules.push(

      createRule({

        type:
          RULE_TYPES.ELIGIBILITY,

        field:
          RULE_FIELDS.CASTE,

        operator:
          OPERATORS.IN,

        expectedValue: [
          "SC",
          "ST",
        ],

        source:
          sentence,

        extractor:
          "extractCaste",

      })

    );

    return rules;

  }

  // -------------------------
  // Individual caste keywords
  // -------------------------

  const casteMap = {

    "scheduled caste":
      "SC",

    "scheduled tribe":
      "ST",

    obc:
      "OBC",

    ews:
      "EWS",

    general:
      "GENERAL",

  };

  const matches =
    matchKeywords(
      sentence,
      casteMap
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
        RULE_FIELDS.CASTE,

      operator:
        OPERATORS.EQUALS,

      expectedValue:
        matches[0],

      source:
        sentence,

      extractor:
        "extractCaste",

    })

  );

  return rules;

};