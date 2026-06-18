import {
  RULE_FIELDS,
  RULE_TYPES,
  OPERATORS,
} from "../constants.js";

import { createRule }
from "../createRule.js";

export const extractAge = (sentence = "") => {

  const rules = [];

  const text = sentence.toLowerCase();


  // Ignore non-age references to years
  if (
    text.includes("residence") ||
    text.includes("resident") ||
    text.includes("domicile") ||
    text.includes("stay")
  ) {
    return rules;
  }

  // -------------------------
  // Between XX to YY years
  // -------------------------

  let match = text.match(
    /between\s+(\d+)\s+(?:to|-|and)\s+(\d+)\s+years?/
  );

  if (match) {

    rules.push(
      createRule({
        type: RULE_TYPES.ELIGIBILITY,
        field: RULE_FIELDS.AGE,
        operator: OPERATORS.BETWEEN,
        expectedValue: {
          min: Number(match[1]),
          max: Number(match[2]),
        },
        source: sentence,
        extractor: "extractAge",
      })
    );

    return rules;

  }

  // -------------------------
  // At least XX years
  // -------------------------

  match = text.match(
    /at\s+least\s+(\d+)\s+years?/
  );

  if (match) {

    rules.push(
      createRule({
        type: RULE_TYPES.ELIGIBILITY,
        field: RULE_FIELDS.AGE,
        operator: OPERATORS.GREATER_THAN_EQUAL,
        expectedValue: Number(match[1]),
        source: sentence,
        extractor: "extractAge",
      })
    );

    return rules;

  }

  // -------------------------
  // Minimum XX years
  // -------------------------

  match = text.match(
    /minimum\s+(?:age\s+)?(?:should\s+be\s+)?(\d+)\s+years?/
  );

  if (match) {

    rules.push(
      createRule({
        type: RULE_TYPES.ELIGIBILITY,
        field: RULE_FIELDS.AGE,
        operator: OPERATORS.GREATER_THAN_EQUAL,
        expectedValue: Number(match[1]),
        source: sentence,
        extractor: "extractAge",
      })
    );

    return rules;

  }

  // -------------------------
  // Above XX years
  // -------------------------

  match = text.match(
    /above\s+(\d+)\s+years?/
  );

  if (match) {

    rules.push(
      createRule({
        type: RULE_TYPES.ELIGIBILITY,
        field: RULE_FIELDS.AGE,
        operator: OPERATORS.GREATER_THAN,
        expectedValue: Number(match[1]),
        source: sentence,
        extractor: "extractAge",
      })
    );

    return rules;

  }

  return rules;

};

 