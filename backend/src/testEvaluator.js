import { evaluateRule }
from "./services/eligibility/evaluateRule.js";

import {
  RULE_FIELDS,
  OPERATORS,
}
from "./services/eligibility/constants.js";

const citizen = {

  age: 30,

  income: 75000,

  gender: "FEMALE",

  state: "Delhi",

  caste: "SC",

  occupation: "UNEMPLOYED",

  is_student: true,

  is_farmer: false,

  is_disabled: true,

  marital_status: "SINGLE",

  residence_years: 8,

};

const rules = [

  {
    field: RULE_FIELDS.AGE,
    operator: OPERATORS.GREATER_THAN_EQUAL,
    expectedValue: 18,
  },

  {
    field: RULE_FIELDS.INCOME,
    operator: OPERATORS.LESS_THAN_EQUAL,
    expectedValue: 100000,
  },

  {
    field: RULE_FIELDS.GENDER,
    operator: OPERATORS.EQUALS,
    expectedValue: "FEMALE",
  },

  {
    field: RULE_FIELDS.STATE,
    operator: OPERATORS.EQUALS,
    expectedValue: "Delhi",
  },

  {
    field: RULE_FIELDS.CASTE,
    operator: OPERATORS.IN,
    expectedValue: [
      "SC",
      "ST",
    ],
  },

  {
    field: RULE_FIELDS.OCCUPATION,
    operator: OPERATORS.EQUALS,
    expectedValue: "UNEMPLOYED",
  },

  {
    field: RULE_FIELDS.STUDENT,
    operator: OPERATORS.EQUALS,
    expectedValue: true,
  },

  {
    field: RULE_FIELDS.FARMER,
    operator: OPERATORS.EQUALS,
    expectedValue: false,
  },

  {
    field: RULE_FIELDS.DISABILITY,
    operator: OPERATORS.EQUALS,
    expectedValue: true,
  },

  {
    field: RULE_FIELDS.MARITAL_STATUS,
    operator: OPERATORS.EQUALS,
    expectedValue: "SINGLE",
  },

  {
    field: RULE_FIELDS.RESIDENCE_YEARS,
    operator: OPERATORS.GREATER_THAN_EQUAL,
    expectedValue: 5,
  },

];

for (const rule of rules) {

  console.log("\n====================");

  console.log(rule.field);

  console.log("====================");

  console.log(
    evaluateRule(
      citizen,
      rule
    )
  );

}