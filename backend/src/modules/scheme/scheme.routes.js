import express from "express";

import {
  getSchemes,
  getEligibleSchemes,
  getSchemeById,
  searchSchemes,
  getSchemeStats,
} from "./scheme.controller.js";

import {
  getRecommendedSchemes,
} from "./recommendedSchemes.controller.js";

import {
  getRecommendations,
}
from "./controllers/recommendation.controller.js";

import {
  authMiddleware,
} from "../../middleware/auth.middleware.js";

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  getSchemes
);

router.get(
  "/eligible",
  authMiddleware,
  getEligibleSchemes
);

router.get(
  "/recommended/:citizenId",
  getRecommendedSchemes
);

router.get(
  "/stats",
  getSchemeStats
);

router.get(
  "/search",
  searchSchemes
);

router.get(
  "/recommendations",
  authMiddleware,
  getRecommendations
);


router.get(
  "/:id",
  authMiddleware,
  getSchemeById
);







export default router;