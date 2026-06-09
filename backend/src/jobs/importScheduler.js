import cron from "node-cron";

const scheduledJobs = new Map();

import {
  importSourceData,
} from "../modules/scheme-import/schemeImport.service.js";

import {
  getEnabledSources,
} from "../modules/source-config/sourceConfig.service.js";


export const registerSourceScheduler =
  (source) => {

    if (
      scheduledJobs.has(
        source._id.toString()
      )
    ) {

      removeSourceScheduler(
        source._id.toString()
      );
    }

    const job = cron.schedule(
      source.schedule,
      async () => {

        console.log(
          `Running ${source.source} Import`
        );

        try {

          await importSourceData(
            source.source
          );

          console.log(
            `${source.source} Import Complete`
          );

        } catch (error) {

          console.error(
            `${source.source} Import Failed`,
            error.message
          );
        }
      }
    );

    scheduledJobs.set(
      source._id.toString(),
      job
    );

    console.log(
      `${source.source} Scheduler Registered (${source.schedule})`
    );
};

export const removeSourceScheduler =
  (sourceId) => {

    const job =
      scheduledJobs.get(sourceId);

    if (job) {

      job.stop();

      scheduledJobs.delete(
        sourceId
      );

      console.log(
        `Scheduler Removed (${sourceId})`
      );
    }
};

export const reloadSourceScheduler =
  (source) => {

    removeSourceScheduler(
      source._id.toString()
    );

    if (source.enabled) {
      registerSourceScheduler(
        source
      );
    }
};


export const startImportScheduler =
  async () => {

    const sources =
      await getEnabledSources();


    for (const source of sources) {

      try {

        registerSourceScheduler(
          source
        );

      } catch (error) {

        console.error(
          `${source.source} Scheduler Error`,
          error.message
        );
      }
    }

};
