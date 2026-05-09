import api from "./axios";


// Get all applications
export const getAllApplications =
  async () => {

    const response =
      await api.get(
        "/api/admin/applications"
      );

    return response.data;
  };


// Update application status
export const updateApplicationStatus =
  async (
    id,
    status
  ) => {

    const response =
      await api.put(
        `/api/admin/applications/${id}/status`,
        {
          status,
        }
      );

    return response.data;
  };