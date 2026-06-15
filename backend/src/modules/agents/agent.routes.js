import express from "express";


import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deactivateAgent,
  getAgentDashboard,
  getAgentApplications,
  addAgentRemark,
  updateApplicationStatus,
} from "./agent.controller.js";

const router =
  express.Router();

router.post(
  "/",
  createAgent
);

router.get(
  "/",
  getAgents
);

router.post(
  "/application/:id/remark",
  addAgentRemark
);

router.post(
  "/application/:id/status",
  updateApplicationStatus
);

router.get(
  "/:id/dashboard",
  getAgentDashboard
);

router.get(
  "/:id/applications",
  getAgentApplications
);

router.get(
  "/:id",
  getAgentById
);

router.put(
  "/:id",
  updateAgent
);

router.delete(
  "/:id",
  deactivateAgent
);

export default router;