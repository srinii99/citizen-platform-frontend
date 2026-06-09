import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const run = async () => {

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

  console.log(
    JSON.stringify(
      response.data.data.summary,
      null,
      2
    )
  );
};

run();