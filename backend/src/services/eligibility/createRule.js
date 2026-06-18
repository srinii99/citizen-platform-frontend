import { RULE_TYPES }
from "./constants.js";

export const createRule = ({
  type,
  field,
  operator,
  expectedValue,
  source,
  extractor,
  confidence = 1,
}) => {

  // -------------------------
  // Document Rules
  // -------------------------

  if (type === RULE_TYPES.DOCUMENT) {

    return {

      type,

      document: expectedValue,

      source,

      extractor,

      confidence,

    };

  }

  // -------------------------
  // Eligibility Rules
  // -------------------------

  return {

    type,

    field,

    operator,

    expectedValue,

    source,

    extractor,

    confidence,

  };

};