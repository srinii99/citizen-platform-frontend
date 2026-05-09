import api from "./axios";


// Create application
export const createApplication =
  async (scheme_id) => {

    const response =
      await api.post(
        "/applications",
        {
          scheme_id,
        }
      );

    return response.data;
  };


// Get my applications
export const getApplications =
  async () => {

    const response =
      await api.get(
        "/applications"
      );

    return response.data;
  };


// Get application by ID
export const getApplicationById =
  async (id) => {

    const response =
      await api.get(
        `/applications/${id}`
      );

    return response.data;
  };


// Upload document
export const uploadDocument =
  async (
    applicationId,
    formData
  ) => {

    const response =
      await api.post(
        `/applications/${applicationId}/upload`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };


// Generate affidavit
export const generateAffidavit =
  async (
    application_id,
    type
  ) => {

    const response =
      await api.post(
        "/affidavit/generate",
        {
          application_id,
          type,
        }
      );

    return response.data;
  };
// Create payment order
export const createPaymentOrder =
  async (
    application_id,
    amount
  ) => {

    const response =
      await api.post(
        "/payments/create-order",
        {
          application_id,
          amount,
        }
      );

    return response.data;
  };


// Verify payment
export const verifyPayment =
  async (payload) => {

    const response =
      await api.post(
        "/payments/verify",
        payload
      );

    return response.data;
  };
