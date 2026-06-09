import * as schemeImportService
  from "./schemeImport.service.js";

export const getImportStats =
  async (req, res) => {

    try {

      const stats =
        await schemeImportService
          .getImportStats();

      return res.status(200)
        .json({

          success: true,

          data: stats,
        });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error: err.message,
        });
    }
};

export const getImportJobs =
  async (req, res) => {

    try {

      const jobs =
        await schemeImportService
          .getImportJobs();

      return res.json({
        success: true,
        data: jobs,
      });

    } catch (err) {

      return res.status(500)
        .json({
          success: false,
          error: err.message,
        });
    }
};

export const testMySchemeProvider =
  async (req, res) => {

    try {

      const data =
        await schemeImportService
          .testMySchemeProvider();

      return res.json({
        success: true,
        data,
      });

    } catch (err) {

      return res.status(500)
        .json({
          success: false,
          error: err.message,
        });
    }
};

export const importBySource =
  async (req, res) => {

    try {

      const { source } =
        req.params;

      const data =
        await schemeImportService
          .importBySource(
            source
          );

      return res.json({

        success: true,

        data,
      });

    } catch (error) {

      return res.status(500)
        .json({

          success: false,

          error:
            error.message,
        });
    }
};

export const importMockSchemes =
  async (req, res) => {

    try {

      const result =
        await schemeImportService
          .importMockSchemes();

      return res.json({

        success: true,

        count:
          result.imported,
      });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error:
            err.message,
        });
    }
};

export const importMySchemeData =
  async (req, res) => {

    try {

      const result =
        await schemeImportService
          .importMySchemeData();

      return res.json({
        success: true,
        ...result,
      });

    } catch (err) {

      return res.status(500)
        .json({
          success: false,
          error: err.message,
        });
    }
};
export const importSourceData =
  async (req, res) => {

    try {

      const { source } =
        req.params;

      const result =
        await schemeImportService
          .importSourceData(
            source
          );

      return res.json({
        success: true,
        ...result,
      });

    } catch (error) {

      return res.status(500)
        .json({
          success: false,
          error: error.message,
        });
    }
};

export const getLastSyncs =
  async (req, res) => {

    try {

      const data =
        await schemeImportService
          .getLastSyncs();

      return res.json({
        success: true,
        data,
      });

    } catch (error) {

      return res.status(500)
        .json({
          success: false,
          error:
            error.message,
        });
    }
};