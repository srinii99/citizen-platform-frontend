import { OPERATORS }
from "../constants.js";

import {
  EVALUATION_STATUS,
}
from "../evaluationConstants.js";

export const evaluateGender = (
  citizen,
  rule
) => {

  if (!citizen.gender) {

    return {

      status: EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue: rule.expectedValue,

      reason: "Citizen gender is missing.",

    };

  }

  return {

    status:
      citizen.gender === rule.expectedValue
        ? EVALUATION_STATUS.PASS
        : EVALUATION_STATUS.FAIL,

    actualValue: citizen.gender,

    expectedValue: rule.expectedValue,

    reason:
      citizen.gender === rule.expectedValue
        ? "Gender matched."
        : "Gender does not match.",

  };

};