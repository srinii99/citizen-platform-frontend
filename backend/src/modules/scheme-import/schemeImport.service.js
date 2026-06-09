import { Scheme }
from "../scheme/scheme.model.js";

import { ImportJob }
from "./importJob.model.js";


import {
  PROVIDERS,
} from "./providerRegistry.js";


import {
  transformerRegistry,
} from "./transformerRegistry.js";

import {
  importSchemes,
}
from "./importEngine.js";

import {
  fetchMySchemeData,
}
from "./providers/myscheme.provider.js";


import {
  transformMySchemeRecord,
} from "./transformers/myscheme.transformer.js";

import {
  updateImportStatus,
} from "../source-config/sourceConfig.service.js";


export const getImportStats =
  async () => {

    const stats =
      await Scheme.aggregate([
        {
          $group: {
            _id: "$source",
            count: {
              $sum: 1,
            },
          },
        },
      ]);

    return stats;
};

export const getImportJobs =
  async () => {

    return await ImportJob
      .find()
      .sort({
        createdAt: -1,
      })
      .limit(20);
};

export const testMySchemeProvider =
  async () => {


    const rawData =
      await fetchMySchemeData();

    console.log(
      "Records:",
      rawData.length
    );

    console.log(
      JSON.stringify(
        rawData[0],
        null,
        2
      )
    );

    const transformed =
      rawData.map(
        transformMySchemeRecord
      );

    return transformed;
};

export const importBySource =
  async (source) => {

    const provider =
      PROVIDERS[source];

    if (!provider) {

      throw new Error(
        `Provider not found: ${source}`
      );
    }

    const rawData =
      await provider();



    const transformer =
      transformerRegistry[source];

    if (!transformer) {

      throw new Error(
        `Transformer not found: ${source}`
      );
    }

    const transformed =
      rawData.map(
        transformer
      );

    return transformed;
};

export const importMockSchemes =
  async () => {

    const mockSchemes = [

      {
        externalSchemeId: "MYSCHEME_001",
        title: "PM Kisan",
        description: "Income support scheme",
        department: "Agriculture",
        source: "MYSCHEME",
        benefits: "₹6000 annually",
      },

      {
        externalSchemeId: "MYSCHEME_002",
        title: "PM Awas Yojana",
        description: "Housing scheme",
        department: "Housing",
        source: "MYSCHEME",
        benefits: "Housing subsidy",
      },

      {
        externalSchemeId: "MYSCHEME_003",
        title: "Ayushman Bharat",
        description: "Health insurance",
        department: "Health",
        source: "MYSCHEME",
        benefits: "₹5 lakh coverage",
      },

      {
        externalSchemeId: "MYSCHEME_004",
        title: "Sukanya Samriddhi",
        description: "Girl child savings",
        department: "Finance",
        source: "MYSCHEME",
        benefits: "High interest savings",
      },

      {
        externalSchemeId: "MYSCHEME_005",
        title: "PMEGP",
        description: "Entrepreneurship support",
        department: "MSME",
        source: "MYSCHEME",
        benefits: "Business subsidy",
      },
    ];

   for (const schemeData of mockSchemes) {

      await Scheme.findOneAndUpdate(  
        {
          externalSchemeId:
            schemeData.externalSchemeId,
        },
        schemeData,
        {
          upsert: true,
          new: true,
        }
      );
    }   
    return {
      importedCount: mockSchemes.length,
    }
};

export const importMySchemeData =
  async () => {

    const startedAt =
      new Date();

    try {

      const rawData =
        await fetchMySchemeData();

      const transformed =
        rawData.map(
          transformMySchemeRecord
        );

      const result =
        await importSchemes(
          transformed
        );

      await ImportJob.create({

        source:
          "MYSCHEME",

        importedCount:
          result.imported,

        status:
          "SUCCESS",

        startedAt,

        completedAt:
          new Date(),
      });

      return result;

    } catch (error) {

      await ImportJob.create({

        source:
          "MYSCHEME",

        importedCount: 0,

        status:
          "FAILED",

        startedAt,

        completedAt:
          new Date(),

        errorMessage:
          error.message,
      });

      throw error;
    }
};

export const importSourceData =
  async (source) => {

    const job =
      await ImportJob.create({

        source,

        status: "RUNNING",

        startedAt:
          new Date(),
      });

    try {

      const provider =
        PROVIDERS[source];

      if (!provider) {

        throw new Error(
          `Provider not found: ${source}`
        );
      }


      const transformer =
        transformerRegistry[source];

      if (!transformer) {

        throw new Error(
          `Transformer not found: ${source}`
        );
      }

      const rawData =
        await provider();

      const transformed =
        rawData.map(
          transformer
        );

      const result =
        await importSchemes(
          transformed
        );

      await ImportJob.findByIdAndUpdate(
        job._id,
        {
          status: "SUCCESS",

          importedCount:
            result.imported,

          completedAt:
            new Date(),
        }
      );
      await updateImportStatus(
        source,
        "SUCCESS"
      );

      return result;

    } catch (error) {

      await ImportJob.findByIdAndUpdate(
        job._id,
        {
          status: "FAILED",

          errorMessage:
            error.message,

          completedAt:
            new Date(),
        }
      );
      await updateImportStatus(
        source,
        "FAILED",
        error.message
      );

      throw error;
    }
};

export const getLastSyncs =
  async () => {

    const jobs =
      await ImportJob.aggregate([
        {
          $sort: {
            completedAt: -1,
          },
        },
        {
          $group: {
            _id: "$source",

            lastSync: {
              $first:
                "$completedAt",
            },

            status: {
              $first:
                "$status",
            },
          },
        },
      ]);

    return jobs;
};

