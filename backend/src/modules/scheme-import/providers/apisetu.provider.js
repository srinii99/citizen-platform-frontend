export const fetchApiSetuData =
  async () => {

    console.log(
      "Fetching API Setu Data..."
    );

    return [

      {
        schemeCode:
          "APISETU_001",

        schemeTitle:
          "National Scholarship",

        department:
          "Education",

        description:
          "Scholarship support",
      },

      {
        schemeCode:
          "APISETU_002",

        schemeTitle:
          "Skill India",

        department:
          "Skill Development",

        description:
          "Skill training support",
      },
    ];
};