
import api from "../api/axios";

// -------------------------
// IMPORT MONITORING SUMMARY
// -------------------------

export const getImportMonitoringSummary =
  async () => {

    const response =
      await api.get(
        "/admin/import-monitoring"
      );

    return response.data;
  };

// -------------------------
// IMPORT HISTORY
// -------------------------

export const getImportHistory =
  async () => {

    const response =
      await api.get(
        "/admin/import-monitoring/history"
      );

    return response.data;
  };