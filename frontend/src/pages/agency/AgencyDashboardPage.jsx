import {
  useEffect,
  useState,
} from "react";

import api from "../../api/axios";

const AgencyDashboardPage = () => {

  const [dashboard, setDashboard] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {

      try {

        const agencyId =
          "6a1ecce7748e75b7e9bf1a3d";

        const res =
          await api.get(
            `/agencies/${agencyId}/dashboard`
          );

        console.log("API RESPONSE", res.data);



        setDashboard(
          res.data.data
        );

      } catch (err) {

        console.error(err);
      }
    };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Agency Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Total Applications</h3>
          <p className="text-3xl font-bold">
            {dashboard?.totalApplications || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Pending</h3>
          <p className="text-3xl font-bold">
            {dashboard?.pendingApplications || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Completed</h3>
          <p className="text-3xl font-bold">
            {dashboard?.completedApplications || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h3>Agents</h3>
          <p className="text-3xl font-bold">
            {dashboard?.assignedAgents || 0}
          </p>
        </div>

      </div>

    </div>
  );
};

export default AgencyDashboardPage;