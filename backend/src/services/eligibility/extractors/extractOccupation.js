import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractOccupation = (
  sentence = ""
) => {

  const rules = [];

  const occupationMap = {

   

  agriculture: "FARMER",
  agricultural: "FARMER",



  unemployed: "UNEMPLOYED",

  entrepreneur: "ENTREPRENEUR",
  entrepreneurs: "ENTREPRENEUR",
  startup: "ENTREPRENEUR",
  "startup founder": "ENTREPRENEUR",


  business: "BUSINESS_OWNER",
  businessman: "BUSINESS_OWNER",
  businesswoman: "BUSINESS_OWNER",

  artisan: "ARTISAN",
  weaver: "ARTISAN",
  craftsman: "ARTISAN",

  labourer: "LABOURER",
  laborer: "LABOURER",
  worker: "WORKER",
  workers: "WORKER",

  "self employed": "SELF_EMPLOYED",
  "self-employed": "SELF_EMPLOYED",



  };

  const matches =
    matchKeywords(
      sentence,
      occupationMap
    );

  if (matches.length === 0) {

    return rules;

  }

  rules.push(

    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.OCCUPATION,

      operator:
        OPERATORS.EQUALS,

      expectedValue:
        matches[0],

      source:
        sentence,

      extractor:
        "extractOccupation",

    })

  );

  return rules;

};