import api
from "./api";

// -------------------------
// GET ALL SCHEMES
// -------------------------

export const getAdminSchemes =
  async () => {

    const response =
      await api.get(
        "/admin/schemes"
      );

    return response.data;
  };

// -------------------------
// CREATE SCHEME
// -------------------------

export const createScheme =
  async (payload) => {

    const response =
      await api.post(
        "/admin/schemes",
        payload
      );

    return response.data;
  };

// -------------------------
// UPDATE SCHEME
// -------------------------

export const updateScheme =
  async (
    id,
    payload
  ) => {

    const response =
      await api.put(

        `/admin/schemes/${id}`,

        payload
      );

    return response.data;
  };

// -------------------------
// DELETE SCHEME
// -------------------------

export const deleteScheme =
  async (id) => {

    const response =
      await api.delete(
        `/admin/schemes/${id}`
      );

    return response.data;
  };