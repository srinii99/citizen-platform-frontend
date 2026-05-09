import express from "express";
import { generateAffidavit } from "./affidavit.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateAffidavit);

export default router;