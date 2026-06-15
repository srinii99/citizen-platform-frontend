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

router.post(
  "/assign-application",
  agencyController.assignApplicationToAgency
);

router.post(
  "/assign-agent",
  agencyController.assignAgent
);

router.get(
  "/:id/dashboard",
  agencyController.getAgencyDashboard
);

router.get(
  "/:id/agents",
  agencyController.getAgencyAgents
);

router.get(
  "/:id/applications",
  agencyController.getAgencyApplications
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