import api from "./axios";

export const getEligibleSchemes =
  async () => {

    const response =
      await api.get(
        "/schemes/eligible"
      );

    return response.data;
  };

  export const getSchemeById =
  async (id) => {

    const response =
      await api.get(
        `/schemes/${id}`
      );

    return response.data;
  };