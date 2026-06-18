import { OPERATORS }
from "../constants.js";

import {
  EVALUATION_STATUS,
}
from "../evaluationConstants.js";

export const evaluateState = (
  citizen,
  rule
) => {

  if (!citizen.state) {

    return {

      status: EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue: rule.expectedValue,

      reason: "Citizen state is missing.",

    };

  }

  return {

    status:
      citizen.state.toLowerCase() ===
      rule.expectedValue.toLowerCase()
        ? EVALUATION_STATUS.PASS
        : EVALUATION_STATUS.FAIL,

    actualValue: citizen.state,

    expectedValue: rule.expectedValue,

    reason:
      citizen.state.toLowerCase() ===
      rule.expectedValue.toLowerCase()
        ? "State matched."
        : "State does not match.",

  };

};