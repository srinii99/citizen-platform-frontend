import { Scheme }
from "../scheme/scheme.model.js";

import { SourceConfig }
from "../source-config/sourceConfig.model.js";

import { ImportJob }
from "../scheme-import/importJob.model.js";

export const getImportMonitoringSummary =
  async (req, res) => {

    try {

      const sources =
        await SourceConfig.find();

      const summary =
        await Promise.all(

          sources.map(
            async (source) => {

              const importedCount =
                await Scheme.countDocuments({
                  source: source.source,
                });

              const activeCount =
                await Scheme.countDocuments({
                  source: source.source,
                  status: "ACTIVE",
                });

              const lastJob =
                await ImportJob.findOne({
                  source: source.source,
                }).sort({
                  createdAt: -1,
                });

              return {
                source: source.source,
                imported: importedCount,
                active: activeCount,
                failed:
                  lastJob?.failedCount || 0,
                lastSync:
                  source.lastSync,
                enabled:
                  source.enabled,
                lastStatus:
                  lastJob?.status || "N/A",
              };
            }
          )
        );

      return res.status(200).json({
        success: true,
        data: summary,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to load monitoring data",
      });
    }
  };

export const getRecentImportJobs =
  async (req, res) => {

    try {

      const jobs =
        await ImportJob.find()

          .sort({
            createdAt: -1,
          })

          .limit(20);

      return res.json({

        success: true,

        data: jobs,
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        error:
          error.message,
      });
    }
  };