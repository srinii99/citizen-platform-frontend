export const searchSchemes = async ({
  keyword,
  category,
  beneficiary,
  limit = 20,
}) => {

  const query = {
    status: "ACTIVE",
  };

  const conditions = [];

  if (keyword) {

    conditions.push(
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { tags: { $regex: keyword, $options: "i" } },
      { categories: { $regex: keyword, $options: "i" } },
      { benefits: { $regex: keyword, $options: "i" } }
    );
  }

  if (category) {

    conditions.push({
      categories: {
        $regex: category,
        $options: "i",
      },
    });
  }

  if (beneficiary) {

    conditions.push({
      beneficiaries: {
        $regex: beneficiary,
        $options: "i",
      },
    });
  }

  if (conditions.length) {
    query.$or = conditions;
  }

  return Scheme.find(query)
    .limit(limit)
    .lean();
};