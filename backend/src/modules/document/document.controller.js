import {

  DOCUMENT_CATEGORIES,

} from "./documentCategories.js";


export const getDocumentCategories =
  async (req, res) => {

    try {

      return res.status(200)
        .json({

          success: true,

          data:
            DOCUMENT_CATEGORIES,
        });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error:
            err.message,
      });
    }
  };