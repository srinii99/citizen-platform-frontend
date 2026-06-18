import express from "express";

import {
  createApplication,
  getApplications,
  getApplicationById,
  getMyApplications,
  applyForScheme,
  submitApplication,
  updateApplicationStatus,
  assignAgent,
  assignAgency,
  verifyDocument,
  getAgentApplications,
  getAgencyApplications,
  getDocumentViewUrl,
  getGovernmentQueue,
} from "./application.controller.js";

import {
  authMiddleware,
} from "../../middleware/auth.middleware.js";

import {
  upload,
} from "../../middleware/upload.middleware.js";


import {
  uploadDocument,
} from "./upload.controller.js";



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

router.get(
  "/my",
  authMiddleware,
  getMyApplications
);

router.get(

  "/government-queue",

  authMiddleware,

  getGovernmentQueue
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

router.put(
  "/:id/submit",

  authMiddleware,

  submitApplication
);


router.post(
  "/apply/:schemeId",
  authMiddleware,
  applyForScheme
);

// Admin status update
router.put(
  "/:id/status",
  authMiddleware,
  
  updateApplicationStatus
);

router.put(

  "/:id/assign-agent",

  authMiddleware,

  assignAgent
);


router.put(

  "/:id/assign-agency",

  authMiddleware,

  assignAgency
);

router.put(

  "/:id/verify-document",

  authMiddleware,

  verifyDocument
);

router.get(

  "/agent/my-applications",

  authMiddleware,

  getAgentApplications
);


router.get(

  "/agency/my-applications",

  authMiddleware,

  getAgencyApplications
);

router.get(
  "/:id/document/:documentId/view",
  authMiddleware,
  getDocumentViewUrl
);



export default router;