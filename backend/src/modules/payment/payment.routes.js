import express from "express";

import {
  createPaymentOrder,
  verifyPayment
} from "./payment.controller.js";

import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Create Order
router.post(
  "/create-order",
  authMiddleware,
  createPaymentOrder
);

// ✅ Verify Payment
router.post(
  "/verify",
  authMiddleware,
  verifyPayment
);

export default router;