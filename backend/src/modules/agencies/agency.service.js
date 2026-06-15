import Agency from "./agency.model.js";

import Agent from "../agents/agent.model.js";
import { Application } from "../application/application.model.js";

export const createAgency = async (
  payload
) => {

  const count =
    await Agency.countDocuments();

  const agencyCode =
    `AGN${String(
      count + 1
    ).padStart(3, "0")}`;

  return Agency.create({
    ...payload,
    agency_code: agencyCode,
  });
};

export const getAgencies = async () => {
  return Agency.find();
};

export const getAgencyById = async (
  id
) => {
  return Agency.findById(id);
};

export const updateAgency = async (
  id,
  payload
) => {
  return Agency.findByIdAndUpdate(
    id,
    payload,
    {
      returnDocument: "after",
    }
  );
};

export const deactivateAgency =
  async (id) => {
    return Agency.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      {
        returnDocument: "after",
      }
    );
  };

export const getAgencyDashboard =
  async (agencyId) => {

    const totalApplications =
      await Application.countDocuments({
        assigned_agency_id: agencyId,
      });

    const assignedAgents =
      await Agent.countDocuments({
        agency_id: agencyId,
        active: true,
      });

    const pendingApplications =
      await Application.countDocuments({
        assigned_agency_id: agencyId,

        status: {
          $nin: [
            "APPROVED",
            "REJECTED",
            "BENEFIT_DISBURSED",
          ],
        },
      });

    const completedApplications =
      await Application.countDocuments({
        assigned_agency_id: agencyId,

        status: {
          $in: [
            "APPROVED",
            "BENEFIT_DISBURSED",
          ],
        },
      });

    return {
      totalApplications,
      assignedAgents,
      pendingApplications,
      completedApplications,
    };
  };

export const getAgencyAgents =
  async (agencyId) => {

    const agents =
      await Agent.find({
        agency_id: agencyId,
        active: true,
      });

    return agents;
  };

export const getAgencyApplications =
  async (agencyId) => {

    const applications =
      await Application.find({
        assigned_agency_id: agencyId,
      })
      .populate("user_id")
      .populate("scheme_id")
      .populate("assigned_agent_id");

    return applications;
  };

export const assignAgent =
  async (
    applicationId,
    agentId
  ) => {

    const agent =
      await Agent.findById(
        agentId
      );

    if (!agent) {
      throw new Error(
        "Agent not found"
      );
    }

    const application =
      await Application.findById(
        applicationId
      );

    if (!application) {
      throw new Error(
        "Application not found"
      );
    }

    application.assigned_agent_id =
      agentId;

    application.assigned_agent_at =
      new Date();

    application.current_owner_type =
      "AGENT";

    application.status =
      "ASSIGNED_TO_AGENT";

    
    if (!application.assignment_history) {
      application.assignment_history = [];
    }

    application.assignment_history.push({

      from_owner_type:
        "AGENCY",

      to_owner_type:
        "AGENT",

      agency_id:
        application.assigned_agency_id,

      agent_id:
        agentId,

      assigned_at:
        new Date(),
    });

    await application.save();

    return application;
  };

export const assignApplicationToAgency =
  async (
    applicationId,
    agencyId
  ) => {

    const agency =
      await Agency.findById(
        agencyId
      );

    if (!agency) {
      throw new Error(
        "Agency not found"
      );
    }

    const application =
      await Application.findById(
        applicationId
      );

    if (!application) {
      throw new Error(
        "Application not found"
      );
    }

    application.assigned_agency_id =
      agencyId;

    application.assigned_agency_at =
      new Date();

    application.current_owner_type =
      "AGENCY";

    application.status =
      "ASSIGNED_TO_AGENCY";

    if (!application.assignment_history) {
      application.assignment_history = [];
    }

    application.assignment_history.push({
    
      from_owner_type:
        "ADMIN",

      to_owner_type:
        "AGENCY",

      agency_id:
        agencyId,

      assigned_at:
        new Date(),
    });

    await application.save();

    return application;
  };