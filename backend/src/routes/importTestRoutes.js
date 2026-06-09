import express from "express";
import {
  importMyScheme,
} from "../services/importers/myschemeImporter.js";

const router = express.Router();

router.get("/myscheme", async (req, res) => {

  try {

    const result =
      await importMyScheme();

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

export default router;