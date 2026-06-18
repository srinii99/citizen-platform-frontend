import { normalizeEligibility }
from "./services/eligibility/eligibilityNormalizer.js";

const testCases = [

{
    name: "Stand-Up India",

    text: `
Finance is provided for Greenfield Enterprises.

If the applicant is a male, he must be from SC / ST category.

The age of the applicant must be at least 18 years.

The applicant must not be in default to any bank/financial institution.
`
},

{
    name: "Delhi Marriage Scheme",

    text: `
Financial assistance can be granted for performing marriage up to two daughters only.

Residence of a minimum of 5 years in Delhi before the date of application.

The income of the applicant should be less than ₹1,00,000 per year.

Applicant should have an Aadhaar number.

The Applicant should have a single-operated Aadhaar-linked account.

The girl whose marriage is to be solemnized should be above 18 years.
`
},

{
    name: "Sikkim Startup Scheme",

    text: `
Applicant must possess a Certificate of Identification (COI) or Sikkim Subject Certificate.

Applicant must be unemployed.
Applicant must be a student.

Applicant must be between 18 to 45 years of age.

Applicant's family income must not exceed ₹8 lakhs per annum.

Applicants under the Persons with Disabilities (PWD) category will be given priority.
The scheme is for farmers.
Applicant must be a widow.

Applicant should be unmarried.

Scheme is only for divorced women.
Residence of a minimum of 5 years in Delhi before the date of application.

Applicant should be a resident for 10 years.

Minimum 3 years residence is required.

Applicant must have at least 15 years residence.
Applicant should possess Aadhaar Card.

Income Certificate is mandatory.

Caste Certificate should be submitted.

Bank Passbook is required.

PAN Card must be attached.

Driving Licence is accepted.

Passport can also be submitted.

`
}

];

for (const test of testCases) {

    console.log("\n=================================");
    console.log(test.name);
    console.log("=================================");

    const rules =
        normalizeEligibility(test.text);

    console.log(
        JSON.stringify(
            rules,
            null,
            2
        )
    );

    console.log(
        "\nRules Extracted:",
        rules.length
    );

}