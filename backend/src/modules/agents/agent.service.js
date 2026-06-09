import Agent from "./agent.model.js";

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