import dotenv from "dotenv";
dotenv.config();

import {
  fetchSchemeDetails,
} from "./modules/scheme-import/providers/myscheme.provider.js";

const run = async () => {

  const scheme =
    await fetchSchemeDetails(
      "sui"
    );

  console.log(
    JSON.stringify(
      scheme,
      null,
      2
    )
  );
};

run();