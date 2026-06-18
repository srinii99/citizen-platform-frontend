import api from "./axios";

export const getGovernmentQueue =
  async (
    filter = "ACTIVE"
  ) => {

    const response =
      await api.get(
        `/applications/government-queue?filter=${filter}`
      );

    return response.data;
  };