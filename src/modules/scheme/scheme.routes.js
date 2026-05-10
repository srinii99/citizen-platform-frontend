import express from "express";

import {
  getSchemes,
  getEligibleSchemes,
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
  getEligibleSchemes
);

router.get(
  "/:id",
  authMiddleware,
  getSchemeById
);

export default router;