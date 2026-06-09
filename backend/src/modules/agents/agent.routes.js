import express from "express";

import {
  createAgent,
  getAgents,
  getAgentById,
  updateAgent,
  deactivateAgent,
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