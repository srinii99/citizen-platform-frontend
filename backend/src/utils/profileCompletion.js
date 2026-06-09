export const calculateProfileCompletion =
  (user) => {

    const requiredFields = [

      "name",

      "aadhaar_name",

      "mobile",

      "gender",

      "age",

      "state",

      "district",

      "city",

      "address",

      "occupation",

      "income",

      "caste",
    ];


    let completed = 0;


    requiredFields.forEach(
      (field) => {

        if (

          user[field] !== undefined &&

          user[field] !== null &&

          user[field] !== ""
        ) {

          completed++;
        }
      }
    );


    const missingFields =

      requiredFields.filter(

        (field) =>

          !user[field]
      );


    return {

      percentage:
        Math.round(

          (completed /
            requiredFields.length) * 100
        ),

      missingFields,
    };
  };