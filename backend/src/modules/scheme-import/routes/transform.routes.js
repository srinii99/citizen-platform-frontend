import express from "express";

import {
  transformMySchemeData,
}
from "../controllers/transform.controller.js";

const router =
  express.Router();

router.post(
  "/myscheme",
  transformMySchemeData
);

export default router;