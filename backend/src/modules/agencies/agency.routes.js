import express from "express";

import * as agencyController from "./agency.controller.js";

const router = express.Router();

router.post(
  "/",
  agencyController.createAgency
);

router.get(
  "/",
  agencyController.getAgencies
);

router.get(
  "/:id",
  agencyController.getAgencyById
);

router.put(
  "/:id",
  agencyController.updateAgency
);

router.delete(
  "/:id",
  agencyController.deactivateAgency
);

export default router;