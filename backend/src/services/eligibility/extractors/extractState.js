import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

export const extractState = (
  sentence = ""
) => {

  const rules = [];

  const lowerSentence =
    sentence.toLowerCase();

  for (const state of STATES) {

    if (
      lowerSentence.includes(
        state.toLowerCase()
      )
    ) {

     rules.push(
        createRule({

            type:
            RULE_TYPES.ELIGIBILITY,

            field:
            RULE_FIELDS.STATE,

            operator:
            OPERATORS.EQUALS,

            expectedValue:
            state,

            source:
            sentence,

            extractor:
            "extractState",

        })
        );

      break;

    }

  }

  return rules;

};