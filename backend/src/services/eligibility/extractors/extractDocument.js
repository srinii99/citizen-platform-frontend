import { RULE_TYPES } from "../constants.js";

import { createRule }
from "../createRule.js";

import { DOCUMENT_TYPES }
from "../documentConstants.js";

import { matchKeywords }
from "../utils/keywordMatcher.js";

export const extractDocument = (
  sentence = ""
) => {

  const rules = [];

  const documentMap = {

    aadhaar:
      DOCUMENT_TYPES.AADHAAR,

    "aadhaar card":
      DOCUMENT_TYPES.AADHAAR,

    pan:
      DOCUMENT_TYPES.PAN,

    "pan card":
      DOCUMENT_TYPES.PAN,

    passport:
      DOCUMENT_TYPES.PASSPORT,

    "voter id":
      DOCUMENT_TYPES.VOTER_ID,

    voter:
      DOCUMENT_TYPES.VOTER_ID,

    "ration card":
      DOCUMENT_TYPES.RATION_CARD,

    "income certificate":
      DOCUMENT_TYPES.INCOME_CERTIFICATE,

    "caste certificate":
      DOCUMENT_TYPES.CASTE_CERTIFICATE,

    "domicile certificate":
      DOCUMENT_TYPES.DOMICILE_CERTIFICATE,

    "residence certificate":
      DOCUMENT_TYPES.RESIDENCE_CERTIFICATE,

    "disability certificate":
      DOCUMENT_TYPES.DISABILITY_CERTIFICATE,

    "bank passbook":
      DOCUMENT_TYPES.BANK_PASSBOOK,

    passbook:
      DOCUMENT_TYPES.BANK_PASSBOOK,

    "driving licence":
      DOCUMENT_TYPES.DRIVING_LICENSE,

    "driving license":
      DOCUMENT_TYPES.DRIVING_LICENSE,

    "birth certificate":
      DOCUMENT_TYPES.BIRTH_CERTIFICATE,

    "death certificate":
      DOCUMENT_TYPES.DEATH_CERTIFICATE,

    "bpl card":
      DOCUMENT_TYPES.BPL_CARD,

  };

  const matches =
    matchKeywords(
      sentence,
      documentMap
    );

  for (const document of matches) {

    rules.push(

      createRule({

        type:
          RULE_TYPES.DOCUMENT,

        expectedValue:
          document,

        source:
          sentence,

        extractor:
          "extractDocument",

      })

    );

  }

  return rules;

};