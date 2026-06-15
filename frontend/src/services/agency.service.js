import axios from "axios";

const API =
  import.meta.env.VITE_API_URL;

export const getAgencyDashboard =
  async (agencyId) => {

    const response =
      await axios.get(
        `${API}/agencies/${agencyId}/dashboard`
      );

    return response.data;
  };

export const getAgencyApplications =
  async (agencyId) => {

    const response =
      await axios.get(
        `${API}/agencies/${agencyId}/applications`
      );

    return response.data;
  };

export const getAgencyAgents =
  async (agencyId) => {

    const response =
      await axios.get(
        `${API}/agencies/${agencyId}/agents`
      );

    return response.data;
  };