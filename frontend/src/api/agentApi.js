import api from "./axios";

export const getAgents = async () => {
  const response = await api.get(
    "/api/agents"
  );

  return response.data;
};

export const createAgent = async (
  payload
) => {
  const response = await api.post(
    "/api/agents",
    payload
  );

  return response.data;
};

export const updateAgent = async (
  id,
  payload
) => {
  const response = await api.put(
    `/api/agents/${id}`,
    payload
  );

  return response.data;
};

export const deactivateAgent =
  async (id) => {
    const response =
      await api.delete(
        `/api/agents/${id}`
      );

    return response.data;
  };