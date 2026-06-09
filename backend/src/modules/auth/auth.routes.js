import express from "express";
import {
  sendOTPController,
  verifyOTPController
} from "./auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOTPController);
router.post("/verify-otp", verifyOTPController);

export default router;