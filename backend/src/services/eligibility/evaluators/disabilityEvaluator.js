import { EVALUATION_STATUS }
from "../evaluationConstants.js";

export const evaluateDisability = (
  citizen,
  rule
) => {

  if (
    citizen.is_disabled === undefined
  ) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Disability status missing.",

    };

  }

  return {

    status:

      citizen.is_disabled ===
      rule.expectedValue

        ? EVALUATION_STATUS.PASS

        : EVALUATION_STATUS.FAIL,

    actualValue:
      citizen.is_disabled,

    expectedValue:
      rule.expectedValue,

    reason:
      "Disability status evaluated.",

  };

};