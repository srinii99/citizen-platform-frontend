import express from "express";

import {
  createApplication,
  getApplications,
  getApplicationById,
  uploadDocument,
  applyForScheme,
} from "./application.controller.js";

import {
  authMiddleware,
} from "../../middleware/auth.middleware.js";

import {
  upload,
} from "../../middleware/upload.middleware.js";



const router =
  express.Router();


// Create application
router.post(
  "/",
  authMiddleware,
  createApplication
);


// Get all my applications
router.get(
  "/",
  authMiddleware,
  getApplications
);


// Get single application
router.get(
  "/:id",
  authMiddleware,
  getApplicationById
);


// Upload document
router.post(
  "/:id/upload",
  authMiddleware,
  upload.single("document"),
  uploadDocument
);

router.post(
  "/apply/:schemeId",
  authMiddleware,
  applyForScheme
);

export default router;