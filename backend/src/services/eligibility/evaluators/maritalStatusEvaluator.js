import { EVALUATION_STATUS }
from "../evaluationConstants.js";

export const evaluateMaritalStatus = (
  citizen,
  rule
) => {

  if (
    citizen.marital_status === undefined
  ) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Marital status missing.",

    };

  }

  return {

    status:

      citizen.marital_status ===
      rule.expectedValue

        ? EVALUATION_STATUS.PASS

        : EVALUATION_STATUS.FAIL,

    actualValue:
      citizen.marital_status,

    expectedValue:
      rule.expectedValue,

    reason:
      "Marital status evaluated.",

  };

};