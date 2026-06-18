// -----------------------------------
// RULE TYPES
// -----------------------------------

export const RULE_TYPES = {

  ELIGIBILITY: "ELIGIBILITY",

  DOCUMENT: "DOCUMENT",

  DECLARATION: "DECLARATION",

  APPLICATION: "APPLICATION",

  PREFERENCE: "PREFERENCE",

};


// -----------------------------------
// SUPPORTED FIELDS
// -----------------------------------

export const RULE_FIELDS = {

  AGE: "age",

  GENDER: "gender",

  STATE: "state",

  DISTRICT: "district",

  INCOME: "income",

  CASTE: "caste",

  OCCUPATION: "occupation",

  DISABILITY: "is_disabled",

  STUDENT: "is_student",

  FARMER: "is_farmer",

  MARITAL_STATUS: "marital_status",
  RESIDENCE_YEARS: "residence_years",

};


// -----------------------------------
// OPERATORS
// -----------------------------------

export const OPERATORS = {

  EQUALS: "EQUALS",

  GREATER_THAN: "GREATER_THAN",

  GREATER_THAN_EQUAL: "GREATER_THAN_EQUAL",

  LESS_THAN: "LESS_THAN",

  LESS_THAN_EQUAL: "LESS_THAN_EQUAL",

  BETWEEN: "BETWEEN",

  IN: "IN",
  NOT_EQUALS : "NOT_EQUALS",

  EXISTS: "EXISTS",
  IS_TRUE : "IS_TRUE",

};