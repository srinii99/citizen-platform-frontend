import express from "express";

import {
  getUsers,
} from "./adminUser.controller.js";

const router =
  express.Router();

router.get(
  "/users",
  getUsers
);

export default router;