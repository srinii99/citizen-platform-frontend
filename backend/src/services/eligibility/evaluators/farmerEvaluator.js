import { EVALUATION_STATUS }
from "../evaluationConstants.js";

export const evaluateFarmer = (
  citizen,
  rule
) => {

  if (
    citizen.is_farmer === undefined
  ) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Farmer status missing.",

    };

  }

  return {

    status:

      citizen.is_farmer ===
      rule.expectedValue

        ? EVALUATION_STATUS.PASS

        : EVALUATION_STATUS.FAIL,

    actualValue:
      citizen.is_farmer,

    expectedValue:
      rule.expectedValue,

    reason:
      "Farmer status evaluated.",

  };

};