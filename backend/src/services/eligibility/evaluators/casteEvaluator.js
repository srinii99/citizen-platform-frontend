import { EVALUATION_STATUS }
from "../evaluationConstants.js";

import { OPERATORS }
from "../constants.js";

export const evaluateCaste = (
  citizen,
  rule
) => {

  if (!citizen.caste) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        "Citizen caste is missing.",

    };

  }

  switch (rule.operator) {

    case OPERATORS.EQUALS:

      return {

        status:
          citizen.caste ===
          rule.expectedValue

            ? EVALUATION_STATUS.PASS

            : EVALUATION_STATUS.FAIL,

        actualValue:
          citizen.caste,

        expectedValue:
          rule.expectedValue,

        reason:
          "Caste evaluated.",

      };

    case OPERATORS.IN:

      return {

        status:

          rule.expectedValue.includes(
            citizen.caste
          )

            ? EVALUATION_STATUS.PASS

            : EVALUATION_STATUS.FAIL,

        actualValue:
          citizen.caste,

        expectedValue:
          rule.expectedValue,

        reason:
          "Caste evaluated.",

      };

    default:

      return {

        status:
          EVALUATION_STATUS.UNKNOWN,

        actualValue:
          citizen.caste,

        expectedValue:
          rule.expectedValue,

        reason:
          "Unsupported operator.",

      };

  }

};