import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractStudent = (
  sentence = ""
) => {

  const rules = [];

  const studentMap = {

    student: true,

    students: true,

    school: true,

    college: true,

    university: true,

    scholar: true,

  };

  const matches =
    matchKeywords(
      sentence,
      studentMap
    );

  if (matches.length === 0) {

    return rules;

  }

  rules.push(

    createRule({

      type:
        RULE_TYPES.ELIGIBILITY,

      field:
        RULE_FIELDS.STUDENT,

      operator:
        OPERATORS.EQUALS,

      expectedValue:
        true,

      source:
        sentence,

      extractor:
        "extractStudent",

    })

  );

  return rules;

};