import { evaluateEligibility }
from "./services/eligibility/eligibilityEngine.js";

const citizen = {

  age: 24,

  income: 75000,

  gender: "FEMALE",

  state: "Delhi",

};

const rules = [

  {
    field: "age",
    operator: "GREATER_THAN_EQUAL",
    expectedValue: 18,
  },

  {
    field: "income",
    operator: "LESS_THAN_EQUAL",
    expectedValue: 100000,
  },

  {
    field: "gender",
    operator: "EQUALS",
    expectedValue: "FEMALE",
  },

  {
    field: "state",
    operator: "EQUALS",
    expectedValue: "Delhi",
  },

];

const result =
  evaluateEligibility(
    citizen,
    rules
  );

console.log(

  JSON.stringify(
    result,
    null,
    2
  )

);