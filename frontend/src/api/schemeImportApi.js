import api from "./api";

export const getImportStats = async () => {
  const response =
    await api.get(
      "/admin/scheme-import/stats"
    );

  return response.data;
};

export const importMySchemeData =
  async () => {

    const response =
      await api.post(
        "/admin/scheme-import/my-scheme-import"
      );

    return response.data;
};

export const getImportJobs =
  async () => {

    const response =
      await api.get(
        "/admin/scheme-import/jobs"
      );

    return response.data;
};

export const importSource =
  async (source) => {

    const response =
      await api.post(
        `/admin/scheme-import/import/${source}`
      );

    return response.data;
};

export const getLastSyncs =
  async () => {

    const response =
      await api.get(
        "/admin/scheme-import/last-syncs"
      );

    return response.data;
};