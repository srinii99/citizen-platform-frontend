import express from "express";
import { createProfile, getProfile } from "./profile.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProfile);
router.get("/", authMiddleware, getProfile);

export default router;