import { Scheme }
from "../scheme/scheme.model.js";

export const importSchemes =
  async (schemes) => {

    let imported = 0;

    for (const scheme of schemes) {

      await Scheme.findOneAndUpdate(

        {
          externalSchemeId:
            scheme.externalSchemeId,
        },

        scheme,

        {
          upsert: true,
          returnDocument: "after",
     
        }
      );

      imported++;
    }

    return {
      imported,
    };
};