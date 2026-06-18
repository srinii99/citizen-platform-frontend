import { OPERATORS }
from "../constants.js";

import {
  EVALUATION_STATUS,
}
from "../evaluationConstants.js";

export const evaluateAge = (
  citizen,
  rule
) => {

  const age = citizen.age;

  if (
    age === undefined ||
    age === null
  ) {

    return {

      status: EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Citizen age is missing.",

    };

  }

  switch (rule.operator) {

    case OPERATORS.GREATER_THAN_EQUAL:

      return {

        status:
          age >= rule.expectedValue
            ? EVALUATION_STATUS.PASS
            : EVALUATION_STATUS.FAIL,

        actualValue: age,

        expectedValue:
          rule.expectedValue,

        reason:
          age >= rule.expectedValue
            ? "Age requirement satisfied."
            : "Minimum age not met.",

      };

    case OPERATORS.GREATER_THAN:

      return {

        status:
          age > rule.expectedValue
            ? EVALUATION_STATUS.PASS
            : EVALUATION_STATUS.FAIL,

        actualValue: age,

        expectedValue:
          rule.expectedValue,

        reason:
          age > rule.expectedValue
            ? "Age requirement satisfied."
            : "Age requirement not met.",

      };

    case OPERATORS.BETWEEN:

      return {

        status:

          age >=
            rule.expectedValue.min &&

          age <=
            rule.expectedValue.max

            ? EVALUATION_STATUS.PASS

            : EVALUATION_STATUS.FAIL,

        actualValue: age,

        expectedValue:
          rule.expectedValue,

        reason:
          "Age range evaluated.",

      };

    default:

      return {

        status: EVALUATION_STATUS.UNKNOWN,

        actualValue: age,

        expectedValue:
          rule.expectedValue,

        reason:
          "Unsupported operator.",

      };

  }

};