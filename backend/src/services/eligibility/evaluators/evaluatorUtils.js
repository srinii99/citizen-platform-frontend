import { EVALUATION_STATUS }
from "../evaluationConstants.js";

export const unknownResult = (
  expectedValue,
  reason
) => ({

  status:
    EVALUATION_STATUS.UNKNOWN,

  actualValue: null,

  expectedValue,

  reason,

});