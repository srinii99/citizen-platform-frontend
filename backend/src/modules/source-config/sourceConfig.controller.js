

import {
  getSourceConfigs,
  toggleSource,
  updateSchedule,
  runSourceNow,
} from "./sourceConfig.service.js";

import {
  reloadSourceScheduler,
} from "../../jobs/importScheduler.js";

export const getConfigs =
  async (req, res) => {

    const configs =
      await getSourceConfigs();

    res.json({
      success: true,
      data: configs,
    });
};

export const toggleConfig =
  async (req, res) => {

    const source =
      await toggleSource(
        req.params.id
      );

    res.json({
      success: true,
      data: source,
    });
};


export const updateConfigSchedule =
  async (req, res) => {

    try {

      const { schedule } =
        req.body;

      const source =
        await updateSchedule(
          req.params.id,
          schedule
        );

      reloadSourceScheduler(
        source
      );

      res.json({
        success: true,
        data: source,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
};


export const runSourceImport =
  async (req, res) => {

    const source =
      await runSourceNow(
        req.params.id
      );

    res.json({
      success: true,
      data: source,
    });
};