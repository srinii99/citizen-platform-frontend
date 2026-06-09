import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import {
  fetchMySchemeData,
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

    const schemes =
      await fetchMySchemeData();

    let imported = 0;

    for (const item of schemes) {

      const slug =
        item.fields.slug;

      console.log(
        `Fetching ${slug}`
      );

      const details =
        await fetchSchemeDetails(
          slug
        );

      await MySchemeRaw.findOneAndUpdate(
        {
          slug,
        },
        {
          source: "MYSCHEME",
          schemeId:
            details._id,
          slug,
          rawData:
            details,
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      imported++;
    }

    console.log(
      `Imported ${imported} schemes`
    );

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

run();