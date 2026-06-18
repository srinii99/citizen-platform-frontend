import api from "./api";

export const verifyDocument =
  async (
    applicationId,
    documentId,
    payload
  ) => {

    const response =
      await api.put(

        `/admin/applications/${applicationId}/documents/${documentId}`,

        payload
      );

    return response.data;
  };