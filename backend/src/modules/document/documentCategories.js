export const DOCUMENT_CATEGORIES = {

  PROOF_OF_IDENTITY: {

    label:
      "Proof of Identity",

    mandatory: true,

    accepted_documents: [

      "AADHAAR",

      "VOTER_ID",

      "PASSPORT",

      "DRIVING_LICENSE",
    ],
  },


  PROOF_OF_ADDRESS: {

    label:
      "Proof of Address",

    mandatory: true,

    accepted_documents: [

      "AADHAAR",

      "RATION_CARD",

      "UTILITY_BILL",
    ],
  },


  INCOME_PROOF: {

    label:
      "Income Proof",

    mandatory: true,

    accepted_documents: [

      "INCOME_CERTIFICATE",

      "SALARY_SLIP",
    ],
  },


  CASTE_PROOF: {

    label:
      "Caste Proof",

    mandatory: false,

    accepted_documents: [

      "CASTE_CERTIFICATE",
    ],
  },


  EDUCATION_PROOF: {

    label:
      "Education Proof",

    mandatory: false,

    accepted_documents: [

      "MARKS_CARD",

      "DEGREE_CERTIFICATE",
    ],
  },
};