export const getEligibleSchemesForUser =
  (user, schemes) => {

    return schemes.filter(
      (scheme) => {

        const rules =
          scheme.eligibility;


        // AGE

        if (

          user.age <
            rules.min_age ||

          user.age >
            rules.max_age
        ) {

          return false;
        }


        // GENDER

        if (

          rules.gender !== "ANY" &&

          user.gender !==
          rules.gender
        ) {

          return false;
        }


        // INCOME

        if (

          user.income >
          rules.max_income
        ) {

          return false;
        }


        // STATE

        if (

          rules.state !== "ANY" &&

          user.state !==
          rules.state
        ) {

          return false;
        }


        // OCCUPATION

        if (

          rules.occupation !== "ANY" &&

          user.occupation !==
          rules.occupation
        ) {

          return false;
        }


        return true;
      }
    );
  };