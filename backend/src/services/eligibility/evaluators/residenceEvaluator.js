import {

  EVALUATION_STATUS

}
from "../evaluationConstants.js";

import {

  OPERATORS

}
from "../constants.js";

export const evaluateResidence = (
  citizen,
  rule
) => {

  const years =
    citizen.residence_years;

  if (
    years === undefined
  ) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Residence duration missing.",

    };

  }

  return {

    status:

      years >=
      rule.expectedValue

        ? EVALUATION_STATUS.PASS

        : EVALUATION_STATUS.FAIL,

    actualValue:
      years,

    expectedValue:
      rule.expectedValue,

    reason:
      "Residence duration evaluated.",

  };

};