import express
from "express";

import {

  addFamilyMember,

  getFamilyMembers,

} from "./familyMember.controller.js";

import {

  authMiddleware,

} from "../../middleware/auth.middleware.js";


const router =
  express.Router();


// -------------------------
// ADD FAMILY MEMBER
// -------------------------

router.post(

  "/",

  authMiddleware,

  addFamilyMember
);


// -------------------------
// GET FAMILY MEMBERS
// -------------------------

router.get(

  "/",

  authMiddleware,

  getFamilyMembers
);


export default router;