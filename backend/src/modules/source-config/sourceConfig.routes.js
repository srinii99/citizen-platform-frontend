import express from "express";



import {
  getConfigs,
  toggleConfig,
  updateConfigSchedule,
  runSourceImport,
} from "./sourceConfig.controller.js";

const router =
  express.Router();

router.get(
  "/",
  getConfigs
);

router.patch(
  "/:id/toggle",
  toggleConfig
);

router.patch(
  "/:id/schedule",
  updateConfigSchedule
);

router.post(
  "/:id/run",
  runSourceImport
);



export default router;