const WEIGHTS = {
  state: 10,
  income: 20,
  gender: 10,
  caste: 10,
  occupation: 10,
  student: 10,
  bpl: 15,
  pwd: 20,
  minority: 10,
  distress: 15,
};

const normalize = (value) =>
  (value || "")
    .toString()
    .trim()
    .toLowerCase();

export const evaluateEligibility = (
  profile,
  rules
) => {

  if (!profile || !rules) {
    return {
      isEligible: false,
      reasons: [
        "Invalid profile or rules",
      ],
      score: 0,
      matchPercentage: 0,
    };
  }

  const reasons = [];

  // -------------------------
  // SAFE NORMALIZED PROFILE
  // -------------------------

  const p = {
    gender: normalize(
      profile.gender
    ),

    age: profile.age || 0,

    income:
      profile.income || 0,

    state: normalize(
      profile.state
    ),

    residence_area:
      normalize(
        profile.residence_area
      ),

    caste_category:
      normalize(
        profile.caste_category
      ),

    employment_status:
      normalize(
        profile.employment_status
      ),

    occupation_category:
      normalize(
        profile.occupation_category
      ),

    is_student:
      profile.is_student ||
      false,

    bpl_status:
      profile.bpl_status ||
      false,

    pwd_status:
      profile.pwd_status ||
      false,

    minority_status:
      profile.minority_status ||
      false,

    distress_status:
      profile.distress_status ||
      false,
  };

  // -------------------------
  // ELIGIBILITY CHECKS
  // -------------------------

  // Gender
  
  if (rules.gender) {

    const allowed =
      Array.isArray(
        rules.gender
      )

        ? rules.gender.map(
            normalize
          )

        : [
            normalize(
              rules.gender
            ),
          ];

    if (
      !allowed.includes(
        p.gender
      )
    ) {
      reasons.push(
        "Gender criteria not matched"
      );
    }
  }


  // Min Age
  if (
    rules.min_age &&
    p.age < rules.min_age
  ) {
    reasons.push(
      "Minimum age not matched"
    );
  }

  // Max Age
  if (
    rules.max_age &&
    p.age > rules.max_age
  ) {
    reasons.push(
      "Maximum age exceeded"
    );
  }

  // Max Income
  if (
    rules.max_income &&
    p.income >
      rules.max_income
  ) {
    reasons.push(
      "Income exceeds limit"
    );
  }

  // States
  if (
    rules.states?.length > 0
  ) {

    const allowedStates =
      rules.states.map(
        normalize
      );

    if (
      !allowedStates.includes(
        p.state
      )
    ) {
      reasons.push(
        "State not eligible"
      );
    }
  }

  // Residence Area
  if (
    rules.residence_area
      ?.length > 0
  ) {

    const allowedAreas =
      rules.residence_area.map(
        normalize
      );

    if (
      !allowedAreas.includes(
        p.residence_area
      )
    ) {
      reasons.push(
        "Residence area not eligible"
      );
    }
  }

  // Caste
  if (
    rules.caste_categories
      ?.length > 0
  ) {

    const allowedCastes =
      rules.caste_categories.map(
        normalize
      );

    if (
      !allowedCastes.includes(
        p.caste_category
      )
    ) {
      reasons.push(
        "Caste category not eligible"
      );
    }
  }

  // Employment Status
  if (
    rules.employment_status
      ?.length > 0
  ) {

    const allowedEmployment =
      rules.employment_status.map(
        normalize
      );

    if (
      !allowedEmployment.includes(
        p.employment_status
      )
    ) {
      reasons.push(
        "Employment status not eligible"
      );
    }
  }

  // Occupation
  if (
    rules.occupation_category
      ?.length > 0
  ) {

    const allowedOccupation =
      rules.occupation_category.map(
        normalize
      );

    if (
      !allowedOccupation.includes(
        p.occupation_category
      )
    ) {
      reasons.push(
        "Occupation not eligible"
      );
    }
  }

  // Student
  if (
    rules.student_required &&
    !p.is_student
  ) {
    reasons.push(
      "Student required"
    );
  }

  // BPL
  if (
    rules.bpl_required &&
    !p.bpl_status
  ) {
    reasons.push(
      "BPL required"
    );
  }

  // PWD
  if (
    rules.pwd_required &&
    !p.pwd_status
  ) {
    reasons.push(
      "PWD required"
    );
  }

  // Minority
  if (
    rules.minority_required &&
    !p.minority_status
  ) {
    reasons.push(
      "Minority required"
    );
  }

  // Distress
  if (
    rules.distress_required &&
    !p.distress_status
  ) {
    reasons.push(
      "Distress status required"
    );
  }

  // -------------------------
  // RECOMMENDATION SCORE
  // -------------------------

  let score = 0;

  if (
    rules.states?.includes(
      profile.state
    )
  ) {
    score += WEIGHTS.state;
  }

  if (
    rules.max_income &&
    p.income <=
      rules.max_income
  ) {
    score += WEIGHTS.income;
  }

  if (
    rules.student_required &&
    p.is_student
  ) {
    score += WEIGHTS.student;
  }

  if (
    rules.bpl_required &&
    p.bpl_status
  ) {
    score += WEIGHTS.bpl;
  }

  if (
    rules.pwd_required &&
    p.pwd_status
  ) {
    score += WEIGHTS.pwd;
  }

  if (
    rules.minority_required &&
    p.minority_status
  ) {
    score +=
      WEIGHTS.minority;
  }

  if (
    rules.distress_required &&
    p.distress_status
  ) {
    score +=
      WEIGHTS.distress;
  }

  // -------------------------
  // MATCH %
  // -------------------------

  const totalPossibleScore =
    Object.values(
      WEIGHTS
    ).reduce(
      (a, b) => a + b,
      0
    );

  const matchPercentage =
    Math.min(
      Math.round(
        (score /
          totalPossibleScore) *
          100
      ),
      100
    );

  return {
    isEligible:
      reasons.length === 0,

    reasons,

    rejectionCount:
      reasons.length,

    score,

    matchPercentage,
  };
};