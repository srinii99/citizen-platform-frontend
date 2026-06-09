import { SourceConfig }
from "./sourceConfig.model.js";

import {
  reloadSourceScheduler,
} from "../../jobs/importScheduler.js";

import {
  importSourceData,
} from "../scheme-import/schemeImport.service.js";

import cron from "node-cron";

export const seedSources =
  async () => {

    const sources = [
      "MYSCHEME",
      "APISETU",
    ];

    for (const source of sources) {

      await SourceConfig.findOneAndUpdate(
        { source },
        {
          source,
          enabled: true,
          schedule: "0 2 * * *",
        },
        {
          upsert: true,
        }
      );
    }
};

export const getSourceConfigs =
  async () => {

    return await SourceConfig
      .find()
      .sort({
        source: 1,
      });
};

export const toggleSource =
  async (id) => {

    const source =
      await SourceConfig.findById(id);

    source.enabled =
      !source.enabled;

    await source.save();

    return source;
};


export const updateSchedule =
  async (id, schedule) => {

    if (
      !cron.validate(schedule)

    ){
      throw new Error (
        "Invalid cron Expression"
      );
    }

    const source =
      await SourceConfig.findById(id);

    if (!source) {
      throw new Error(
        "Source not found"
      );
    }

    source.schedule =
      schedule;

    await source.save();


    return source;
};

export const getEnabledSources =
  async () => {

    return await SourceConfig.find({
      enabled: true,
    });
};

export const updateImportStatus =
  async (
    sourceName,
    status,
    error = null
  ) => {

    await SourceConfig.findOneAndUpdate(
      {
        source: sourceName,
      },
      {
        lastRunAt: new Date(),
        lastStatus: status,
        lastError: error,
      }
    );
};

export const runSourceNow =
  async (id) => {

    const source =
      await SourceConfig.findById(id);

    if (!source) {
      throw new Error(
        "Source not found"
      );
    }

    await importSourceData(
      source.source
    );

    return source;
};