import api from "./api";

export const getAdminUsers =
  async () => {

    const response =
      await api.get(
        "/admin/users"
      );

    return response.data;
  };

export const getAdminUserById =
  async (id) => {

    const response =
      await api.get(
        `/admin/users/${id}`
      );

    return response.data;
  };