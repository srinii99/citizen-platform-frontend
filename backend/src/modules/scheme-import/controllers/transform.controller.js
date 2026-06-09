import {
  transformAllMySchemes,
}
from "../services/transformMyScheme.service.js";

export const transformMySchemeData =
  async (req, res) => {

    try {

      const result =
        await transformAllMySchemes();

      res.json({
        success: true,
        result,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };