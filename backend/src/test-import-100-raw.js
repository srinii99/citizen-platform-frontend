import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import {
  fetchSchemeDetails,
} from "./modules/scheme-import/providers/myscheme.provider.js";

import { MySchemeRaw }
from "./modules/scheme-import/models/myschemeRaw.model.js";

import axios from "axios";

const run = async () => {

  try {

    await mongoose.connect(
      process.env.DB_URL
    );

    console.log(
      "Mongo Connected"
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
            size: 100,
          },
        }
      );

    const schemes =
      response.data.data.hits.items || [];

    console.log(
      `Found ${schemes.length} schemes`
    );

    let imported = 0;

    for (const item of schemes) {

      const slug =
        item.fields.slug;

      try {

        console.log(
          `[${imported + 1}/100] ${slug}`
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

            importedAt:
              new Date(),
          },
          {
            upsert: true,
            returnDocument:
              "after",
          }
        );

        imported++;

      } catch (err) {

        console.error(
          `Failed: ${slug}`
        );

      }
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