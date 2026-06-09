import express
from "express";

import {

  verifyWebhook,

  receiveMessage,

} from "./whatsapp.controller.js";


const router =
  express.Router();


// -------------------------
// WEBHOOK VERIFICATION
// -------------------------

router.get(
  "/webhook",
  verifyWebhook
);


// -------------------------
// RECEIVE MESSAGE
// -------------------------

router.post(
  "/webhook",
  receiveMessage
);


export default router;