import { evaluateRule }
from "./evaluateRule.js";

import {

  EVALUATION_STATUS,

  ELIGIBILITY_STATUS,

}
from "./evaluationConstants.js";

export const evaluateEligibility = (
  citizen,
  rules = []
) => {

  const results = [];

  let passed = 0;
  let failed = 0;
  let unknown = 0;

  for (const rule of rules) {

    const evaluation =
      evaluateRule(
        citizen,
        rule
      );

    results.push({

      rule,

      evaluation,

    });

    switch (evaluation.status) {

      case EVALUATION_STATUS.PASS:

        passed++;
        break;

      case EVALUATION_STATUS.FAIL:

        failed++;
        break;

      default:

        unknown++;

    }

  }

  let status;

  if (failed > 0) {

    status =
      ELIGIBILITY_STATUS.NOT_ELIGIBLE;

  }
  else if (unknown > 0) {

    status =
      ELIGIBILITY_STATUS.INSUFFICIENT_INFORMATION;

  }
  else {

    status =
      ELIGIBILITY_STATUS.ELIGIBLE;

  }

  return {

    status,

    summary: {

      total: rules.length,

      passed,

      failed,

      unknown,

    },

    results,

  };

};