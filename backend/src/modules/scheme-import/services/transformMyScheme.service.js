

import { MySchemeRaw }
from "../models/myschemeRaw.model.js";


import { Scheme }
from "../../scheme/scheme.model.js";

import {
  transformMySchemeRecord,
}
from "../transformers/myscheme.transformer.js";

export const transformAllMySchemes =
  async () => {

    console.log(
      "Starting MyScheme Transformation..."
    );

    const stats = {

      total: 0,

      transformed: 0,

      failed: 0,
    };

    const records =
      await MySchemeRaw.find();

    stats.total =
      records.length;

    console.log(
      `Found ${records.length} records`
    );

    for (const record of records) {

      try {

        const transformed =
          await transformMySchemeRecord(
            record
          );

        await Scheme.findOneAndUpdate(
          {
            source: "MYSCHEME",

            slug:
              transformed.slug,
          },
          transformed,
          {
            upsert: true,
          }
        );

        stats.transformed++;

        if (
          stats.transformed % 100 === 0
        ) {
          console.log(
            `Processed ${stats.transformed}`
          );
        }

      } catch (error) {

        console.error(
          `Failed ${record.slug}`,
          
        );

        console.error(error);

        stats.failed++;
      }
    }

    console.log(
      "Transformation Complete"
    );

    return stats;
  };