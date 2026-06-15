import express
from "express";

import {

  verifyWebhook,
  receiveMessage,
  getConversation,
  testFlow,

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



router.get(
  "/conversations/:phoneNumber",
  getConversation
);

router.post(
  "/test-flow",
  testFlow
);


export default router;