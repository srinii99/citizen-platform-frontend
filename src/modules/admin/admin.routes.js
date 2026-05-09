import express from "express";

import {
  getAllApplications,
  updateApplicationStatus,
} from "./admin.controller.js";

import {
  authMiddleware,
} from "../../middleware/auth.middleware.js";

const router =
  express.Router();


// Get all applications
router.get(
  "/applications",
  authMiddleware,
  getAllApplications
);


// Update status
router.put(
  "/applications/:id/status",
  authMiddleware,
  updateApplicationStatus
);


export default router;