import { useEffect, useState } from "react";

import {
  getAdminApplications,
  updateApplicationStatus,
} from "../api/adminApplicationApi";

import AdminReviewModal
from "../components/admin/AdminReviewModal";

function AdminApplicationsPage() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedApplication,
    setSelectedApplication] =
      useState(null);

  // -------------------------
  // FETCH APPLICATIONS
  // -------------------------

  useEffect(() => {

    fetchApplications();

  }, []);

  const handleStatusUpdate =
    async (
      applicationId,
      status,
      remarks = "",
      govtDepartment = "",
      govtReferenceNumber = ""
    ) => {

      try {

        await updateApplicationStatus(

          applicationId,

          {
            status,

            remarks,

            govt_department:
              govtDepartment,

            govt_reference_number:
              govtReferenceNumber,
          }
        );

        fetchApplications();

        closeAdminReviewModal();

      } catch (err) {

        console.log(err);
      }
    };

    console.log(
      "HANDLE STATUS UPDATE DEFINED",
      typeof handleStatusUpdate
    );

  const fetchApplications =
    async () => {

      try {

        const response =
          await getAdminApplications();

        console.log(response);

        setApplications(
          response.data || []
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  // -------------------------
  // APPROVE
  // -------------------------

  const handleApprove =
    async (
      applicationId,
      remarks
    ) => {

      try {

        console.log(
          "APPROVE CLICK"
        );

        await updateApplicationStatus(
          applicationId,
          {
            status: "APPROVED",
            remarks,
          }
        );

        fetchApplications();

        closeAdminReviewModal();

      } catch (err) {

        console.log(err);
      }
    };

  // -------------------------
  // REJECT
  // -------------------------

  const handleReject =
    async (
      applicationId,
      remarks
    ) => {

      try {

        await updateApplicationStatus(
          applicationId,
          {
            status: "REJECTED",
            remarks,
          }
        );

        fetchApplications();

        closeAdminReviewModal();

      } catch (err) {

        console.log(err);
      }
    };

  // -------------------------
  // REQUEST INFO
  // -------------------------

  const handleRequestInfo =
    async (
      applicationId,
      remarks
    ) => {

      try {

        await updateApplicationStatus(
          applicationId,
          {
            status:
              "NEEDS_MORE_INFO",

            remarks,
          }
        );

        fetchApplications();

        closeAdminReviewModal();

      } catch (err) {

        console.log(err);
      }
    };

  // -------------------------
  // MODAL
  // -------------------------

  const openAdminReviewModal =
    (application) => {

      setSelectedApplication(
        application
      );
    };

  const refreshSelectedApplication = async (
      applicationId
    ) => {
      const response =
        await getAdminApplications();

      setApplications(response.data);

      const updated =
        response.data.find(
          app => app._id === applicationId
        );

      setSelectedApplication(updated);
    };

  const closeAdminReviewModal =
    () => {

      setSelectedApplication(
        null
      );
    };

  // -------------------------
  // LOADING
  // -------------------------

  if (loading) {

    return (

      <div className="p-6">

        Loading applications...

      </div>
    );
  }

  // -------------------------
  // UI
  // -------------------------

  return (

    <div className="p-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">

          Application Review Panel

        </h1>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left p-5">

                Citizen

              </th>

              <th className="text-left p-5">

                Scheme

              </th>

              <th className="text-left p-5">

                Status

              </th>

              <th className="text-left p-5">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((app) => (

              <tr
                key={app._id}
                className="border-t"
              >

                <td className="p-5">

                  {app.user_id?.mobile}

                </td>

                <td className="p-5">

                  {app.scheme_id?.title}

                </td>

                <td className="p-5">

                  {app.status}

                </td>

                <td className="p-5">

                  <button
                    type="button"
                    onClick={() =>
                      openAdminReviewModal(app)
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-5
                      py-3
                      rounded-xl
                    "
                  >

                    Review

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}


  
      {
        selectedApplication && (

          <>
    

            <AdminReviewModal
              open={true}
              application={selectedApplication}
              onClose={closeAdminReviewModal}
              onStatusUpdate={handleStatusUpdate}
              refreshApplications={fetchApplications}
              refreshSelectedApplication={
                refreshSelectedApplication
              }
            />
          </>
        )
      }


    </div>
  );
}

export default AdminApplicationsPage;