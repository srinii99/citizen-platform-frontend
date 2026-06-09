import express from "express";

import {
  getImportStats,
  getImportJobs,
  testMySchemeProvider,
  importBySource,
  importMockSchemes,
  importMySchemeData,
  importSourceData,
  getLastSyncs,
} from "./schemeImport.controller.js";

const router = express.Router();

router.get(
  "/stats",
  getImportStats
);

router.get(
  "/jobs",
  getImportJobs
);

router.get(
  "/test-provider",
  testMySchemeProvider
);

router.get(
  "/provider/:source",
  importBySource
);

router.post(
  "/mock-import",
  importMockSchemes
);

router.post(
  "/import-myscheme",
  importMySchemeData
);

router.post(
  "/import/:source",
  importSourceData
);

router.get(
  "/last-syncs",
  getLastSyncs
);

export default router;