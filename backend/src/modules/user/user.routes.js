import express from "express";

const router =
  express.Router();

import {
  authMiddleware,
} from "../../middleware/auth.middleware.js";

import {
  getProfile,
  updateProfile,
  updateConsent,
} from "./user.controller.js";


// -------------------------
// GET PROFILE
// -------------------------

router.get(

  "/profile",

  authMiddleware,

  getProfile
);


// -------------------------
// UPDATE PROFILE
// -------------------------

router.put(

  "/profile",

  authMiddleware,

  updateProfile
);

router.put(

  "/consent",

  authMiddleware,

  updateConsent
);

export default router;