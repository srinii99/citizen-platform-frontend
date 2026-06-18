import { RULE_FIELDS }
from "./constants.js";

import {
  EVALUATION_STATUS,
}
from "./evaluationConstants.js";

import { evaluateAge }
from "./evaluators/ageEvaluator.js";

import { evaluateIncome }
from "./evaluators/incomeEvaluator.js";

import { evaluateGender }
from "./evaluators/genderEvaluator.js";

import { evaluateState }
from "./evaluators/stateEvaluator.js";

import { evaluateCaste }
from "./evaluators/casteEvaluator.js";

import { evaluateOccupation }
from "./evaluators/occupationEvaluator.js";

import { evaluateStudent }
from "./evaluators/studentEvaluator.js";

import { evaluateFarmer }
from "./evaluators/farmerEvaluator.js";

import { evaluateDisability }
from "./evaluators/disabilityEvaluator.js";

import { evaluateMaritalStatus }
from "./evaluators/maritalStatusEvaluator.js";

import { evaluateResidence }
from "./evaluators/residenceEvaluator.js";

const evaluatorMap = {

  [RULE_FIELDS.AGE]:
    evaluateAge,

  [RULE_FIELDS.INCOME]:
    evaluateIncome,

  [RULE_FIELDS.GENDER]:
    evaluateGender,

  [RULE_FIELDS.STATE]:
    evaluateState,

  [RULE_FIELDS.CASTE]:
    evaluateCaste,

  [RULE_FIELDS.OCCUPATION]:
    evaluateOccupation,

  [RULE_FIELDS.STUDENT]:
    evaluateStudent,

  [RULE_FIELDS.FARMER]:
    evaluateFarmer,

  [RULE_FIELDS.DISABILITY]:
    evaluateDisability,

  [RULE_FIELDS.MARITAL_STATUS]:
    evaluateMaritalStatus,

  [RULE_FIELDS.RESIDENCE_YEARS]:
    evaluateResidence,

};

export const evaluateRule = (
  citizen,
  rule
) => {

  const evaluator =
    evaluatorMap[rule.field];

  if (!evaluator) {

    return {

      status:
        EVALUATION_STATUS.UNKNOWN,

      actualValue: null,

      expectedValue:
        rule.expectedValue,

      reason:
        `No evaluator found for field '${rule.field}'.`,

    };

  }

  return evaluator(
    citizen,
    rule
  );

};