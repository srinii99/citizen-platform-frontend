import api from "./axios";

export const getSchemes =
  async () => {

    const response =
      await api.get(
        "/api/schemes"
      );

    return response.data;
  };

export const getEligibleSchemes =
  async () => {

    const response =
      await api.get(
        "/api/schemes/eligible"
      );

    return response.data;
  };

export const getSchemeById =
  async (id) => {

    const response =
      await api.get(
        `/api/schemes/${id}`
      );

    return response.data;
  };