import Agent from "./agent.model.js";
import { Application } from "../application/application.model.js";

export const createAgent = async (
  payload
) => {

  const lastAgent =
    await Agent.findOne()
      .sort({
        createdAt: -1,
      });

  let nextNumber = 1;

  if (
    lastAgent?.agent_code
  ) {

    nextNumber =
      parseInt(
        lastAgent.agent_code.replace(
          "AGT",
          ""
        )
      ) + 1;
  }

  const agentCode =
    `AGT${String(
      nextNumber
    ).padStart(3, "0")}`;

  return Agent.create({
    ...payload,
    agent_code: agentCode,
  });
};

export const getAgents = async () => {
  return Agent.find()
    .populate("agency_id","agency_code name")
    .populate("assigned_schemes","title");
};

export const getAgentById = async (
  id
) => {
  return Agent.findById(id)
    .populate("agency_id","agency_code name");
};

export const updateAgent = async (
  id,
  payload
) => {
  return Agent.findByIdAndUpdate(
    id,
    payload,
    {
      returnDocument: "after",
    }
  );
};

export const deactivateAgent =
  async (id) => {
    return Agent.findByIdAndUpdate(
      id,
      {
        active: false,
      },
      {
        returnDocument: "after",
      }
    );
  };

export const getAgentDashboard =
  async (agentId) => {

    const assignedApplications =
      await Application.countDocuments({
        assigned_agent_id: agentId,
      });

    const pendingApplications =
      await Application.countDocuments({
        assigned_agent_id: agentId,

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
        assigned_agent_id: agentId,

        status: {
          $in: [
            "APPROVED",
            "BENEFIT_DISBURSED",
          ],
        },
      });

    return {
      assignedApplications,
      pendingApplications,
      completedApplications,
    };
  };

export const getAgentApplications =
  async (agentId) => {

    const applications =
      await Application.find({
        assigned_agent_id: agentId,
      })
      .populate("user_id")
      .populate("scheme_id")
      .populate("assigned_agency_id");

    return applications;
  };

export const addAgentRemark =
  async (
    applicationId,
    agentId,
    remark
  ) => {

    const application =
      await Application.findById(
        applicationId
      );

    if (!application) {
      throw new Error(
        "Application not found"
      );
    }

    if (!application.agent_remarks) {
      application.agent_remarks = [];
    }

    application.agent_remarks.push({
      remark,
      created_by: agentId,
      created_at: new Date(),
    });

    await application.save();

    return application;
  };

export const updateApplicationStatus =
  async (
    applicationId,
    status,
    remarks
  ) => {

    const application =
      await Application.findById(
        applicationId
      );

    if (!application) {
      throw new Error(
        "Application not found"
      );
    }

    application.status = status;

    application.status_history.push({
      status,
      admin_remarks:
        remarks || "",
      updated_at:
        new Date(),
    });

    await application.save();

    return application;
  };