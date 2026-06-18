import { OPERATORS }
from "../constants.js";

import {
  EVALUATION_STATUS,
}
from "../evaluationConstants.js";

export const evaluateIncome = (
  citizen,
  rule
) => {

  const income = citizen.income;

  if (
    income === undefined ||
    income === null
  ) {

    return {

      status: EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue: rule.expectedValue,

      reason: "Citizen income is missing.",

    };

  }

  switch (rule.operator) {

    case OPERATORS.LESS_THAN_EQUAL:

      return {

        status:
          income <= rule.expectedValue
            ? EVALUATION_STATUS.PASS
            : EVALUATION_STATUS.FAIL,

        actualValue: income,

        expectedValue: rule.expectedValue,

        reason:
          income <= rule.expectedValue
            ? "Income requirement satisfied."
            : "Income exceeds limit.",

      };

    case OPERATORS.LESS_THAN:

      return {

        status:
          income < rule.expectedValue
            ? EVALUATION_STATUS.PASS
            : EVALUATION_STATUS.FAIL,

        actualValue: income,

        expectedValue: rule.expectedValue,

        reason:
          income < rule.expectedValue
            ? "Income requirement satisfied."
            : "Income exceeds limit.",

      };

    default:

      return {

        status: EVALUATION_STATUS.UNKNOWN,

        actualValue: income,

        expectedValue: rule.expectedValue,

        reason: "Unsupported operator.",

      };

  }

};