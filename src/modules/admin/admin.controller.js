import { Application }
from "../application/application.model.js";


// Get all applications
export const getAllApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find()

          .populate(
            "scheme_id"
          )

          .populate(
            "user_id"
          )

          .sort({
            created_at: -1,
          });

      return res.status(200).json({

        success: true,

        count:
          applications.length,

        data:
          applications,
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error:
          err.message,
      });
    }
  };


// Update application status
export const updateApplicationStatus =
  async (req, res) => {

    try {

      const application =
        await Application.findByIdAndUpdate(

          req.params.id,

          {
            status:
              req.body.status,
          },

          { new: true }
        );

      return res.status(200).json({

        success: true,

        data:
          application,
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error:
          err.message,
      });
    }
  };