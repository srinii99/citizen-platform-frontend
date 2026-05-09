import PDFDocument from "pdfkit";

import fs from "fs";

import path from "path";

import { Affidavit }
from "./affidavit.model.js";

import { Profile }
from "../profile/profile.model.js";

import { Template }
from "./template.model.js";

import { Application }
from "../application/application.model.js";


export const generateAffidavit =
  async (req, res) => {

    try {

      const {
        application_id,
        type,
      } = req.body;

      // Validation
      if (!application_id) {

        throw new Error(
          "application_id is required"
        );
      }

      if (!type) {

        throw new Error(
          "Affidavit type is required"
        );
      }

      // Fetch profile
      const profile =
        await Profile.findOne({
          user_id:
            req.user.user_id,
        });

      if (!profile) {

        throw new Error(
          "Profile not found"
        );
      }

      // Fetch template
      const template =
        await Template.findOne({
          type,
        });

      if (!template) {

        throw new Error(
          "Template not found"
        );
      }

      // Replace placeholders
      const lines =
        template.content.map(
          (line) =>

            line
              .replace(
                "{{name}}",
                profile.name || ""
              )

              .replace(
                "{{income}}",
                profile.income || ""
              )

              .replace(
                "{{caste}}",
                profile.caste || ""
              )

              .replace(
                "{{state}}",
                profile.state || ""
              )

              .replace(
                "{{district}}",
                profile.district || ""
              )
        );

      // File setup
      const fileName =
        `affidavit_${Date.now()}.pdf`;

      const uploadDir =
        "uploads";

      const filePath =
        path.join(
          uploadDir,
          fileName
        );

      if (
        !fs.existsSync(
          uploadDir
        )
      ) {

        fs.mkdirSync(
          uploadDir,
          {
            recursive: true,
          }
        );
      }

      // Create PDF
      const doc =
        new PDFDocument();

      doc.pipe(
        fs.createWriteStream(
          filePath
        )
      );

      // Title
      doc
        .fontSize(20)
        .text(
          template.title,
          {
            align:
              "center",
          }
        );

      doc.moveDown(2);

      // Content
      doc.fontSize(12);

      lines.forEach(
        (line) => {

          doc.text(line);

          doc.moveDown();
        }
      );

      // Date
      doc.moveDown(1);

      doc.text(
        `Date: ${new Date().toLocaleDateString()}`
      );

      // Signature
      doc.moveDown(2);

      doc.text(
        "Signature: __________________"
      );

      doc.end();

      // Save affidavit
      const affidavit =
        await Affidavit.create({

          user_id:
            req.user.user_id,

          application_id,

          type,

          content:
            `/uploads/${fileName}`,
        });

      // Update application
      await Application.findByIdAndUpdate(
        application_id,
        {
          affidavit_status:
            "GENERATED",
        }
      );

      // Response
      return res.status(200).json({

        success: true,

        message:
          "Affidavit generated",

        file:
          `/uploads/${fileName}`,

        affidavit,
      });

    } catch (err) {

      return res.status(400).json({

        success: false,

        error:
          err.message,
      });
    }
  };