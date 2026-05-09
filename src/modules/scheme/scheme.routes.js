import express from "express";

import {
  getSchemes,
  checkEligibility,
  getSchemeById,
} from "./scheme.controller.js";

import {
  authMiddleware,
} from "../../middleware/auth.middleware.js";

const router =
  express.Router();

router.get(
  "/",
  getSchemes
);

router.get(
  "/eligible",
  authMiddleware,
  checkEligibility
);

router.get(
  "/:id",
  authMiddleware,
  getSchemeById
);

export default router;