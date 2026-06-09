import api from "./axios";

export const getSourceConfigs =
  () =>
    api.get(
      "/admin/source-config"
    );

export const toggleSource =
  (id) =>
    api.patch(
      `/admin/source-config/${id}/toggle`
    );

export const updateSchedule =
  (id, schedule) =>
    api.patch(
      `/admin/source-config/${id}/schedule`,
      { schedule }
    );

export const runSourceNow =
  (id) =>
    api.post(
      `/admin/source-config/${id}/run`
    );