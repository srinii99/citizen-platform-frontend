import api from "./axios";


// Get all applications
export const getAllApplications =
  async () => {

    const response =
      await api.get(
        "/admin/applications"
      );

    return response.data;
  };


// Update application status
export const updateApplicationStatus =
  async (
    id,
    status,
    remarks = ""
  ) => {

    const response =
      await api.put(
        `/admin/applications/${id}/status`,
        {
          status,
          remarks,
        }
      );

    return response.data;
  };

export const getApplicationDocuments =
  async (applicationId) => {

    const response =
      await api.get(

        `/admin/applications/${applicationId}/documents`
      );

    return response.data;
  };


export const verifyDocument =
  async (

    applicationId,

    documentId,

    payload
  ) => {

    const response =
      await api.put(

        `/api/admin/applications/${applicationId}/documents/${documentId}`,

        payload
      );

    return response.data;
  };


  export const getDocumentViewUrl =
    async (
      applicationId,
      documentId
    ) => {

      const response =
        await api.get(
          `/api/applications/${applicationId}/document/${documentId}/view`
        );

      return response.data;
    };


  export const getSchemeStats =
    () =>
      api.get(
        "/schemes/stats"
    );