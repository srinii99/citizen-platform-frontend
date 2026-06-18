import { EVALUATION_STATUS }
from "../evaluationConstants.js";

export const evaluateStudent = (
  citizen,
  rule
) => {

  if (
    citizen.is_student === undefined
  ) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Student status missing.",

    };

  }

  return {

    status:

      citizen.is_student ===
      rule.expectedValue

        ? EVALUATION_STATUS.PASS

        : EVALUATION_STATUS.FAIL,

    actualValue:
      citizen.is_student,

    expectedValue:
      rule.expectedValue,

    reason:
      "Student status evaluated.",

  };

};