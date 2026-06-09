import bucket
from "../../config/gcpStorage.js";

import {
  Application,
} from "./application.model.js";

import {
  successResponse,
  errorResponse,
} from "../../utils/apiResponse.js";


// -------------------------
// UPLOAD DOCUMENT
// -------------------------

export const uploadDocument =
  async (
    req,
    res,
    next
  ) => {

    try {

      // CHECK FILE

      if (!req.file) {

        return errorResponse(

          res,

          "No file uploaded",

          null,

          400
        );
      }

      // GET APPLICATION

      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return errorResponse(

          res,

          "Application not found",

          null,

          404
        );
      }

      // UNIQUE FILE NAME

      const fileName =

        `${Date.now()}-${req.file.originalname}`;

      // CREATE FILE IN BUCKET

      const blob =
        bucket.file(fileName);

      // CREATE STREAM

      const blobStream =
        blob.createWriteStream({

          resumable: false,
        });

      // ERROR

      blobStream.on(

        "error",

        (err) => {

          next(err);
        }
      );

      // SUCCESS

      blobStream.on(

        "finish",

        async () => {
      
          

          // PUBLIC URL

          const publicUrl =

            `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

          // SAVE TO APPLICATION

          application.documents.push({

            document_name:
              req.body.name ||
              req.file.originalname,

            file_url:
              publicUrl,
          });

          await application.save();

          return successResponse(

            res,

            {
              file_url:
                publicUrl,

              application,
            },

            "Document uploaded successfully"
          );
        }
      );

      // SEND FILE

      blobStream.end(
        req.file.buffer
      );

    } catch (err) {

      next(err);
    }
  };