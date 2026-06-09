import api from "./axios";


// Create application
export const createApplication =
  async (scheme_id) => {

    const response =
      await api.post(
        "/api/applications/my",
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

// -------------------------
// MY APPLICATIONS
// -------------------------

export const getMyApplications =
  async () => {

    const response =
      await api.get(
        "/api/applications/my"
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
export const applyForScheme =
  async (schemeId) => {

    const response =
      await api.post(
        `/api/applications/apply/${schemeId}`
      );

    return response.data;
  };

// Upload document
export const uploadDocument =
  async (
    applicationId,
    file,
    name
  ) => {

    const formData =
      new FormData();

    formData.append(
      "document",
      file
    );

    formData.append(
      "name",
      name
    );

    const response =
      await api.post(

        `/api/applications/${applicationId}/upload`,

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

// -------------------------
// SUBMIT APPLICATION
// -------------------------

export const submitApplication =
  async (applicationId) => {

    const response =
      await api.put(

        `/api/applications/${applicationId}/submit`
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
