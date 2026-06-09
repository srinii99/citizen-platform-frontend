import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

console.log(
  process.env.MYSCHEME_API_KEY
    ? "KEY FOUND"
    : "KEY MISSING"
);

const response = await axios.get(
  "https://api.myscheme.gov.in/search/v6/schemes",
  {
    headers: {
      accept: "application/json",
      origin: "https://www.myscheme.gov.in",
      "x-api-key":
        process.env.MYSCHEME_API_KEY,
    },
    params: {
      lang: "en",
      keyword: "",
      sort: "",
      from: 0,
      size: 1,
    },
  }
);

console.log(
  response.data.data.hits.items[0]
    .fields.schemeName
);