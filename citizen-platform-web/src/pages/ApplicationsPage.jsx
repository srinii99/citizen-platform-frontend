import { useEffect, useState } from "react";

import api from "../api/api";

import DashboardLayout from "../layouts/DashboardLayout";

function ApplicationsPage() {

  const [applications, setApplications] =
    useState([]);

  // ✅ Fetch applications
  const fetchApplications = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/applications",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setApplications(response.data.data);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {

    fetchApplications();

  }, []);

  return (

    <DashboardLayout>

      <h1>My Applications</h1>

      <br />

      {
        applications.map((app) => (

          <div
            key={app._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px"
            }}
          >

            <h2>
              {app.scheme_id?.name}
            </h2>

            <p>
              <strong>Status:</strong>
              {" "}
              {app.status}
            </p>

            <p>
              <strong>Created:</strong>
              {" "}
              {
                new Date(
                  app.created_at
                ).toLocaleDateString()
              }
            </p>

          </div>
        ))
      }

    </DashboardLayout>
  );
}

export default ApplicationsPage;