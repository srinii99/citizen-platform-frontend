import axios from "axios";

import {
  MySchemeRaw,
} from "../models/myschemeRaw.model.js";

import {
  fetchSchemeDetails,
} from "../providers/myscheme.provider.js";

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

const fetchWithRetry = async (
  slug,
  retries = 5
) => {

  for (
    let attempt = 1;
    attempt <= retries;
    attempt++
  ) {

    try {

      return await fetchSchemeDetails(
        slug
      );

    } catch (error) {

      if (
        error.response?.status === 429
      ) {

        const waitTime =
          attempt * 5000;

        console.log(
          `429 received for ${slug}. Waiting ${waitTime / 1000}s...`
        );

        await sleep(waitTime);

        continue;
      }

      throw error;
    }
  }

  throw new Error(
    "Max retries exceeded"
  );
};

export const importMySchemeRaw =
  async () => {

    console.log(
      "Starting MyScheme Import..."
    );

    const stats = {

      totalFound: 0,

      imported: 0,

      updated: 0,

      failed: 0,
    };

    const processedSlugs = new Set();



    const firstResponse =
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

        const totalSchemes =
        firstResponse.data.data.summary.total;

        console.log(
        `Total schemes: ${totalSchemes}`
        );
      

    for (
        let offset = 0;
        offset < totalSchemes;
        offset += 100
        ) {

       // if (offset >= 1000)
         //   break;
        
        console.log(
            `Page ${(offset / 100) + 1}`
        );

        console.log(
            `Processing offset ${offset}`
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
                from: offset,
                size: 100,
                },
            }
            );

        const schemes =
            response.data.data.hits.items || [];

        stats.totalFound +=
            schemes.length;


        for (const item of schemes) {

            const slug =
                item.fields.slug;

            if (processedSlugs.has(slug)) {

                console.log(
                `Skipping duplicate ${slug}`
                );

                continue;
            }

            processedSlugs.add(slug);

      try {

        console.log(
          `Importing ${slug}`
        );

        const details =
          await fetchWithRetry(
            slug
          );

        const existing =
            await MySchemeRaw.findOne({
                slug,
            });

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

            lastImportedAt:
              new Date(),
          },
          {
            upsert: true,
            returnDocument:
              "after",
          }
        );

   
        if (existing) {

            stats.updated++;

            } else {

            stats.imported++;

            }

            const processed =
            stats.imported +
            stats.updated +
            stats.failed;

            if(processed %100 === 0){
            console.log(
            `Progress: ${processed}/${totalSchemes}`
            );
        }

            await sleep(1000);




        } catch (error) {


            console.error(
            `Failed: ${slug}`,
            );
            console.error(
                error.response?.data ||
                error.messsage
            );

            stats.failed++;
        }
        }

        console.log(
          `Completed offset ${offset}`
        );
    }

    return stats;
    };
        

       