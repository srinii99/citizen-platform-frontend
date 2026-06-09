import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import {
  fetchSchemeDetails,
} from "./modules/scheme-import/providers/myscheme.provider.js";

import {
  MySchemeRaw,
} from "./modules/scheme-import/models/myschemeRaw.model.js";

const run = async () => {

  try {

    await mongoose.connect(
      process.env.DB_URL
    );

    console.log(
      "Mongo Connected"
    );

    const scheme =
      await fetchSchemeDetails(
        "sui"
      );

    const saved =
      await MySchemeRaw.findOneAndUpdate(
        {
          slug: scheme.slug,
        },
        {
          source: "MYSCHEME",

          schemeId:
            scheme._id,

          slug:
            scheme.slug,

          rawData:
            scheme,
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

    console.log(
      "Saved:",
      saved.slug
    );

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

run();