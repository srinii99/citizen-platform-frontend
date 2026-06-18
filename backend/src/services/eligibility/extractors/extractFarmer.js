import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractFarmer = (
  sentence = ""
) => {

  const rules = [];

  const FarmerMap = {


    farmer: true,

  farmers: true,

  agriculture: true,

  agricultural: true,

  cultivator: true,

    

  };

  const matches =
    matchKeywords(
      sentence,
      FarmerMap
    );

  if (matches.length === 0) {

    return rules;

  }

  rules.push(

    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.FARMER,

      operator:
        OPERATORS.EQUALS,

      expectedValue:
        true,

      source:
        sentence,

      extractor:
        "extractFarmer",

    })

  );

  return rules;

};