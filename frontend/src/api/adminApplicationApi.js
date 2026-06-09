import api
from "./api";

// -------------------------
// GET APPLICATIONS
// -------------------------

export const getAdminApplications =
  async () => {

    const response =
      await api.get(
        "/admin/applications"
      );

    return response.data;
  };


// -------------------------
// UPDATE STATUS
// -------------------------


export const updateApplicationStatus =
  async (
    id,
    payload
  ) => {

    const response =
      await api.put(

        `/admin/applications/${id}/status`,

        payload
      );

    return response.data;
  };