import { Application }
from "./application.model.js";


import Agent
from "../agents/agent.model.js";

import Agency
from "../agencies/agency.model.js";

import {

  WORKFLOW_RULES,

} from "../../constants/workflowRules.js";

import bucket
from "../../config/gcpStorage.js";


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
        )
          .populate("user_id")
          .populate("scheme_id")
          .populate("assigned_agency_id")
          .populate("assigned_agent_id");


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


// ✅ Apply for Scheme
export const applyForScheme =
  async (req, res) => {

    try {

      const { schemeId } =
        req.params;

      // ✅ Check existing application
      const existingApplication =
        await Application.findOne({

          user_id:
            req.user.user_id,

          scheme_id:
            schemeId
        });

      if (
        existingApplication
      ) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Application already exists"
          });
      }

      // ✅ Create application
      const application =
        await Application.create({

          user_id:
            req.user.user_id,

          scheme_id:
            schemeId,

          status:
            "STARTED",

          status_history: [

            {
              status:
                "STARTED",

              remarks:
                "Application draft started",
            },
          ],
        });

      res.status(201).json({

        success: true,

        message:
          "Application draft created",

        data:
          application
      });

    } catch (err) {

      res.status(500).json({

        success: false,

        error:
          err.message
      });
    }
  };


// ✅ Final Submit Application
export const submitApplication =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      // ✅ Find application
      const application =
        await Application.findById(
          id
        ).populate(
          "scheme_id"
        );

      if (!application) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Application not found"
          });
      }

      // ✅ Ownership check
      if (

        application.user_id
          .toString()

        !==

        req.user.user_id
      ) {

        return res.status(403)
          .json({

            success: false,

            message:
              "Unauthorized"
          });
      }

      // ✅ Required docs from NEW schema
      const requiredDocs =
        application.scheme_id
          .documents_required || [];

      const uploadedDocs =
        application.documents || [];

      // ✅ Check missing docs
      const missingDocs =
        requiredDocs.filter(
          (requiredDoc) => {

            return !uploadedDocs
              .some(

                (uploadedDoc) =>

                  uploadedDoc
                    .document_name ===
                  requiredDoc
              );
          }
        );

      // ✅ Validation fail
      if (
        missingDocs.length > 0
      ) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Please upload all required documents",

            missing_documents:
              missingDocs
          });
      }

      // ✅ Update status
      application.status =
        "SUBMITTED";

      // ✅ Push timeline history
      application.status_history
        .push({

          status:
            "SUBMITTED",

          remarks:
            "Application submitted successfully",

          updated_at:
            new Date(),
        });

      await application.save();

      return res.json({

        success: true,

        message:
          "Application submitted successfully",

        data:
          application
      });

    } catch (err) {

      return res.status(500)
        .json({

          success: false,

          error:
            err.message
        });
    }
  };

// -------------------------
// GET MY APPLICATIONS
// -------------------------

export const getMyApplications =
  async (req, res, next) => {

    try {

      const applications =
        await Application.find({

          user_id:
            req.user.user_id

        })

        .populate("scheme_id")

        .sort({
          created_at: -1
        });

      return res.status(200)
        .json(applications);

    } catch (err) {

      next(err);
    }
  };

export const getAllApplicationsAdmin =
  async (req, res) => {

    try {

      const applications =
        await Application.find()

          .populate("user_id")

          .populate("scheme_id")

          .sort({
            createdAt: -1,
          });

      return res.status(200).json({

        success: true,

        data: applications,
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error:
          err.message,
      });
    }
  };


export const updateApplicationStatus =
  async (req, res) => {

    try {

      console.log("===== STATUS UPDATE =====");
      console.log("Application ID:", req.params.id);
      console.log("Request Body:", req.body);

      const {

        status,

        remarks,

      } = req.body;


      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Application not found",
          });
      }


      // -------------------------
      // WORKFLOW VALIDATION
      // -------------------------

      const currentStatus =
        application.status;


      const allowedTransitions =

        WORKFLOW_RULES[
          currentStatus
        ] || [];


      const isValidTransition =

        allowedTransitions.includes(
          status
        );


      if (!isValidTransition) {

        return res.status(400)
          .json({

            success: false,

            message:
              `Invalid workflow transition from ${currentStatus} to ${status}`,
          });
      }


      // -------------------------
      // UPDATE STATUS
      // -------------------------

      application.status =
        status;

      if (
        status ===
        "FORWARDED_TO_GOVT"
      ) {

        application.govt_department =
          req.body.govt_department || "";

        application.govt_reference_number =
          req.body.govt_reference_number || "";

        application.govt_status =
          "PENDING";

        application.forwarded_to_govt_at =
          new Date();
      }

      if (
        status ===
        "GOVT_UNDER_REVIEW"
      ) {

        application.govt_status =
          "UNDER_REVIEW";

        application.govt_under_review_at=
          new Date();
      }

      if (
        status ===
        "APPROVED"
      ) {

        application.govt_status =
          "APPROVED";

        application.approved_at =
          new Date();
      }

      if (
        status ===
        "REJECTED"
      ) {

        application.govt_status =
          "REJECTED";

        application.rejected_at =
         new Date();
      }

      if (
        status ===
        "BENEFIT_DISBURSED"
      ) {

        application.benefit_disbursed_at =
          new Date();
      }

      if (
        status ===
        "DOCUMENT_VERIFIED"
      ) {

        console.log(
          "DOCUMENT_VERIFIED BLOCK EXECUTED"
        );

        application.documents =
          application.documents.map(
            (doc) => ({

              ...doc.toObject(),

              verification_status:
                "VERIFIED",

              verification_remarks:
                remarks ||
                "Verified by admin",
            })
          );

        console.log(
          "UPDATED DOCS:",
          application.documents
        );
      }
  
      console.log(
        "DOCUMENTS BEFORE SAVE:",
        application.documents
      );

      application.admin_remarks =
        remarks || "";

      application.updated_at =
        new Date();


      // -------------------------
      // STATUS HISTORY
      // -------------------------

      application.status_history
        .push({

          status,

          admin_remarks:
            remarks || "",

          updated_at:
            new Date(),
        });

      console.log(
        "SAVING APPLICATION",
        application._id
      );


      await application.save();


      return res.status(200)
        .json({

          success: true,

          data: application,
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

export const getApplicationDocuments =
  async (req, res) => {

    try {

      const application =
        await Application.findById(
          req.params.id
        )
        .populate("user_id")
        .populate("scheme_id");

      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",
        });
      }

      return res.json({

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


  export const verifyDocument =
  async (req, res) => {

    console.log("VERIFY DOCUMENT HIT");
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);

    try {

      const {

        documentId,

      } = req.params;

      const {

        verification_status,

        verification_remarks,

      } = req.body;


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


   
      const document =
        application.documents.find(
          (doc) =>
            doc._id.toString() ===
            documentId
        );
     

      if (!document) {

        return res.status(404).json({

          success: false,

          message:
            "Document not found",
        });
      }


      document.verification_status =
        verification_status;

      document.verification_remarks =
        verification_remarks;

      application.markModified(
        "documents"
      );

      await application.save();


      // -------------------------
      // CHECK IF ALL DOCUMENTS VERIFIED
      // -------------------------

      const allVerified =
        application.documents.every(
          (doc) =>
            doc.verification_status ===
            "VERIFIED"
        );

      console.log(
        "ALL DOCUMENTS VERIFIED:",
        allVerified
      );

      if (allVerified) {

        application.status =
          "DOCUMENT_VERIFIED";

        application.status_history.push({

          status:
            "DOCUMENT_VERIFIED",

          admin_remarks:
            "All documents verified",

          updated_at:
            new Date(),
        });

        await application.save();
      }
            


      return res.json({

        success: true,

        message:
          "Document verified successfully",
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error: err.message,
      });
    }
  };

  
export const assignAgent =
  async (req, res) => {

    try {

      const {

        agent_id,

      } = req.body;


      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Application not found",
          });
      }


      const agent =
        await Agent.findById(
          agent_id
        );

      if (!agent) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Agent not found",
          });
      }


      application.assigned_agent =
        agent._id;

      application.status =
        "ASSIGNED_TO_AGENT";


      application.status_history
        .push({

          status:
            "ASSIGNED_TO_AGENT",

          admin_remarks:
            "Assigned to agent",

          updated_at:
            new Date(),
        });


      await application.save();


      return res.status(200)
        .json({

          success: true,

          data: application,
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

export const assignAgency =
  async (req, res) => {

    try {

      const {

        agency_id,

      } = req.body;


      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Application not found",
          });
      }


      const agency =
        await Agency.findById(
          agency_id
        );

      if (!agency) {

        return res.status(404)
          .json({

            success: false,

            message:
              "Agency not found",
          });
      }


      application.assigned_agency =
        agency._id;

      application.status =
        "ASSIGNED_TO_AGENCY";


      application.status_history
        .push({

          status:
            "ASSIGNED_TO_AGENCY",

          admin_remarks:
            "Assigned to agency",

          updated_at:
            new Date(),
        });


      await application.save();


      return res.status(200)
        .json({

          success: true,

          data: application,
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



export const getAgentApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find({

          assigned_agent:
            req.user.user_id,
        })

        .populate("user_id")

        .populate("scheme_id")

        .sort({

          updated_at: -1,
        });


      return res.status(200)
        .json({

          success: true,

          data: applications,
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

export const getAgencyApplications =
  async (req, res) => {

    try {

      const applications =
        await Application.find({

          assigned_agency:
            req.user.agency_id,
        })

        .populate("user_id")

        .populate("scheme_id")

        .sort({

          updated_at: -1,
        });


      return res.status(200)
        .json({

          success: true,

          data: applications,
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

export const getDocumentViewUrl =
  async (req, res) => {

    console.log(
    "GET DOCUMENT VIEW URL HIT"
    );

    try {

      console.log(
        "Application ID:",
        req.params.id
      );

      console.log(
        "Document ID:",
        req.params.documentId
      );

      const application =
        await Application.findById(
          req.params.id
        );

      if (!application) {

        return res.status(404)
          .json({
            success: false,
            message: "Application not found",
          });
      }
      console.log(
        "APPLICATION FOUND:",
        !!application
      );

      console.log(
        "DOCUMENTS:",
        application.documents
      );

      const document =
        application.documents.id(
          req.params.documentId
        );

      if (!document) {

        return res.status(404)
          .json({
            success: false,
            message: "Document not found",
          });
      }

      const fileName =
        decodeURIComponent(
          document.file_url.split("/").pop()
        );

      const file =
        bucket.file(fileName);

      return res.json({

        success: true,

        url: document.file_url,
      });
    

    } catch (err) {
        console.log(
          "DOCUMENT VIEW ERROR"
        );

        console.log(err);

        console.log(err.message);

        return res.status(500)
          .json({

            success: false,

            error:
              err.message,
          });
      }



  };


export const getGovernmentQueue =
  async (req, res) => {



    try {

      const filter =
        req.query.filter || "ALL";

      let statuses = [];

      switch (filter) {

  

        case "APPROVED":
          statuses = ["APPROVED"];
          break;
        
        case "REJECTED":
          statuses = ["REJECTED"];
          break;

        case "BENEFIT_DISBURSED":
          statuses = ["BENEFIT_DISBURSED"];
          break;

        case "ALL":
          statuses = [
            "FORWARDED_TO_GOVT",
            "GOVT_UNDER_REVIEW",
            "APPROVED",
            "BENEFIT_DISBURSED",
            "REJECTED",
          ];
          break;

        default:
          statuses = [
            "FORWARDED_TO_GOVT",
            "GOVT_UNDER_REVIEW",
            "APPROVED",
          ];
      }

      console.log("FILTER:", filter);
      console.log("STATUSES:", statuses);

      const applications =
        await Application.find({

          status: {
            $in: statuses,
          },

          forwarded_to_govt_at: {
            $exists: true,
          },
        })

        .populate("user_id")
        .populate("scheme_id")

        .sort({
          updated_at: -1,
        });

      console.log(
        "Government Queue Count:",
        applications.length
      );

      return res.json({

        success: true,

        data: applications,
      });

    } catch (err) {

      return res.status(500).json({

        success: false,

        error: err.message,
      });
    }
  };


