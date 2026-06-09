import express from "express";

import {
  createTemplate,
  getTemplates,
  getTemplateByType,
  updateTemplate,
  deleteTemplate
} from "./template.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { adminMiddleware } from "../../middleware/admin.middleware.js";
import { validateTemplate } from "../../middleware/validateTemplate.middleware.js";


const router = express.Router();

// 🔐 Protected Admin Routes

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateTemplate,
  createTemplate
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getTemplates
);

router.get(
  "/:type",
  authMiddleware,
  adminMiddleware,
  getTemplateByType
);

router.put(
  "/:type",
  authMiddleware,
  adminMiddleware,
  updateTemplate
);

router.delete(
  "/:type",
  authMiddleware,
  adminMiddleware,
  deleteTemplate
);

export default router;