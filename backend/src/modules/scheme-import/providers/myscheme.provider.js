import axios from "axios";

export const fetchMySchemeData =
  async () => {

    console.log(
      "Fetching MyScheme Data..."
    );

    const response =
      await axios.get(
        "https://api.myscheme.gov.in/search/v6/schemes",
        {
          headers: {
            accept: "application/json",

            origin:
              "https://www.myscheme.gov.in",

            "x-api-key":
              process.env.MYSCHEME_API_KEY,
          },

          params: {
            lang: "en",
            keyword: "",
            sort: "",
            from: 0,
            size: 10,
          },
        }
      );

    return (
      response.data.data.hits.items || []
    );
};

export const fetchSchemeDetails =
  async (slug) => {

    const response =
      await axios.get(
        "https://api.myscheme.gov.in/schemes/v6/public/schemes",
        {
          headers: {
            accept: "application/json",

            origin:
              "https://www.myscheme.gov.in",

            "x-api-key":
              process.env.MYSCHEME_API_KEY,
          },

          params: {
            slug,
            lang: "en",
          },
        }
      );

    return response.data.data;
};