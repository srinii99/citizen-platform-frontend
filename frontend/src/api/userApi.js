import api from "./axios";


// -------------------------
// GET PROFILE
// -------------------------

export const getProfile =
  async () => {

    const response =
      await api.get(
        "/api/profile"
      );

    return response.data;
  };


// -------------------------
// UPDATE PROFILE
// -------------------------

export const updateProfile =
  async (payload) => {

    const response =
      await api.post(

        "/api/profile",

        payload
      );

    return response.data;
  };