import { EVALUATION_STATUS }
from "../evaluationConstants.js";

import { OPERATORS }
from "../constants.js";

export const evaluateOccupation = (
  citizen,
  rule
) => {

  if (!citizen.occupation) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Occupation missing.",

    };

  }

  return {

    status:

      citizen.occupation ===
      rule.expectedValue

        ? EVALUATION_STATUS.PASS

        : EVALUATION_STATUS.FAIL,

    actualValue:
      citizen.occupation,

    expectedValue:
      rule.expectedValue,

    reason:
      "Occupation evaluated.",

  };

};