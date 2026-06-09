import api from "./axios";

export const getAgencies = async () => {
  const response = await api.get(
    "/api/agencies"
  );

  return response.data;
};

export const createAgency = async (
  payload
) => {
  const response = await api.post(
    "/api/agencies",
    payload
  );

  return response.data;
};

export const updateAgency = async (
  id,
  payload
) => {
  const response = await api.put(
    `/api/agencies/${id}`,
    payload
  );

  return response.data;
};

export const deactivateAgency =
  async (id) => {
    const response =
      await api.delete(
        `/api/agencies/${id}`
      );

    return response.data;
  };