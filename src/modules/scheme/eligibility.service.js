export const evaluateEligibility = (
  profile,
  rules
) => {

  if (!profile || !rules) {
    return {
      isEligible: false,
      reasons: [
        "Invalid profile or rules"
      ],
    };
  }

  const reasons = [];

  // Gender
  if (
    rules.gender &&
    rules.gender.length > 0
  ) {
    const gender =
      (profile.gender || "")
        .toLowerCase();

    const allowed =
      rules.gender.map((g) =>
        g.toLowerCase()
      );

    if (!allowed.includes(gender)) {
      reasons.push(
        "Gender criteria not matched"
      );
    }
  }

  // Min Age
  if (
    rules.min_age &&
    profile.age < rules.min_age
  ) {
    reasons.push(
      "Minimum age not matched"
    );
  }

  // Max Age
  if (
    rules.max_age &&
    profile.age > rules.max_age
  ) {
    reasons.push(
      "Maximum age exceeded"
    );
  }

  // Max Income
  if (
    rules.max_income &&
    profile.income >
      rules.max_income
  ) {
    reasons.push(
      "Income exceeds limit"
    );
  }

  // States
  if (
    rules.states &&
    rules.states.length > 0
  ) {

    const state =
      (profile.state || "")
        .toLowerCase();

    const allowedStates =
      rules.states.map((s) =>
        s.toLowerCase()
      );

    if (
      !allowedStates.includes(state)
    ) {
      reasons.push(
        "State not eligible"
      );
    }
  }

  // Residence Area
  if (
    rules.residence_area &&
    rules.residence_area.length > 0
  ) {

    const area =
      (
        profile.residence_area || ""
      ).toLowerCase();

    const allowedAreas =
      rules.residence_area.map(
        (a) => a.toLowerCase()
      );

    if (
      !allowedAreas.includes(area)
    ) {
      reasons.push(
        "Residence area not eligible"
      );
    }
  }

  // Caste
  if (
    rules.caste_categories &&
    rules.caste_categories
      .length > 0
  ) {

    const caste =
      (
        profile.caste_category || ""
      ).toLowerCase();

    const allowedCastes =
      rules.caste_categories.map(
        (c) => c.toLowerCase()
      );

    if (
      !allowedCastes.includes(
        caste
      )
    ) {
      reasons.push(
        "Caste category not eligible"
      );
    }
  }

  // Employment Status
  if (
    rules.employment_status &&
    rules.employment_status
      .length > 0
  ) {

    const employment =
      (
        profile.employment_status ||
        ""
      ).toLowerCase();

    const allowedEmployment =
      rules.employment_status.map(
        (e) => e.toLowerCase()
      );

    if (
      !allowedEmployment.includes(
        employment
      )
    ) {
      reasons.push(
        "Employment status not eligible"
      );
    }
  }

  // Occupation Category
  if (
    rules.occupation_category &&
    rules.occupation_category
      .length > 0
  ) {

    const occupation =
      (
        profile.occupation_category ||
        ""
      ).toLowerCase();

    const allowedOccupation =
      rules.occupation_category.map(
        (o) => o.toLowerCase()
      );

    if (
      !allowedOccupation.includes(
        occupation
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
    !profile.is_student
  ) {
    reasons.push(
      "Student required"
    );
  }

  // BPL
  if (
    rules.bpl_required &&
    !profile.bpl_status
  ) {
    reasons.push(
      "BPL required"
    );
  }

  // PWD
  if (
    rules.pwd_required &&
    !profile.pwd_status
  ) {
    reasons.push(
      "PWD required"
    );
  }

  // Minority
  if (
    rules.minority_required &&
    !profile.minority_status
  ) {
    reasons.push(
      "Minority required"
    );
  }

  // Distress
  if (
    rules.distress_status &&
    !profile.distress_status
  ) {
    reasons.push(
      "Distress status required"
    );
  }

  return {
    isEligible:
      reasons.length === 0,
    reasons,
  };
};



export const calculateRecommendationScore =
  (profile, rules) => {

    let score = 0;

    // State match
    if (
      rules.states?.includes(
        profile.state
      )
    ) {
      score += 20;
    }

    // Income match
    if (
      rules.max_income &&
      profile.income <=
        rules.max_income
    ) {
      score += 20;
    }

    // Student
    if (
      profile.is_student &&
      rules.student_required
    ) {
      score += 20;
    }

    // BPL
    if (
      profile.bpl_status &&
      rules.bpl_required
    ) {
      score += 25;
    }

    // PWD
    if (
      profile.pwd_status &&
      rules.pwd_required
    ) {
      score += 30;
    }

    return score;
  };