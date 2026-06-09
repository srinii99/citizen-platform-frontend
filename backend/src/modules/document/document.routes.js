import express
from "express";

import {

  authMiddleware,

} from "../../middleware/auth.middleware.js";

import {

  getDocumentCategories,

} from "./document.controller.js";


const router =
  express.Router();


// -------------------------
// GET DOCUMENT CATEGORIES
// -------------------------

router.get(

  "/document-categories",

  authMiddleware,

  getDocumentCategories
);


export default router;