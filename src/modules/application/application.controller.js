import { Application }
from "./application.model.js";


// Create application
export const createApplication =
  async (req, res) => {

    try {

      const existingApplication =
        await Application.findOne({
          user_id:
            req.user.user_id,

          scheme_id:
            req.body.scheme_id,
        });

      // Prevent duplicate applications
      if (existingApplication) {

        return res.status(400).json({
          success: false,
          message:
            "Application already exists",
        });
      }

      const application =
        await Application.create({
          user_id:
            req.user.user_id,

          scheme_id:
            req.body.scheme_id,
        });

      return res.status(201).json({
        success: true,
        data: application,
      });

    } catch (err) {

      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }
  };


// Get my applications
export const getApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find({
          user_id:
            req.user.user_id,
        })

        .populate("scheme_id")

        .sort({
          created_at: -1,
        });

      return res.status(200).json({
        success: true,
        count:
          applications.length,
        data: applications,
      });

    } catch (err) {

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };


// Get application by ID
export const getApplicationById =
  async (req, res) => {

    try {

      const application =
        await Application.findById(
          req.params.id
        ).populate("scheme_id");

      if (!application) {

        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: application,
      });

    } catch (err) {

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };


// Upload document
export const uploadDocument =
  async (req, res) => {

    try {

      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404).json({
          success: false,
          message:
            "Application not found",
        });
      }

      // File missing
      if (!req.file) {

        return res.status(400).json({
          success: false,
          message:
            "No file uploaded",
        });
      }

      const document = {

        name:
          req.body.name ||
          req.file.originalname,

        file_url:
          `http://localhost:3000/uploads/${req.file.filename}`,
      };

      application.documents.push(
        document
      );

      await application.save();

      return res.status(200).json({
        success: true,
        message:
          "Document uploaded successfully",
        data: application,
      });

    } catch (err) {

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  };