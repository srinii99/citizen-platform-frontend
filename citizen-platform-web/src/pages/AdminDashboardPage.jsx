import {
  useEffect,
  useState,
} from "react";

import {
  getAllApplications,
  updateApplicationStatus,
} from "../api/adminApi";

const AdminDashboardPage = () => {

  const [applications,
    setApplications] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications =
    async () => {

      try {

        const res =
          await getAllApplications();

        setApplications(
          res.data
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

  const handleStatusUpdate =
    async (
      id,
      status
    ) => {

      try {

        await updateApplicationStatus(
          id,
          status
        );

        loadApplications();

      } catch (err) {

        console.error(err);

        alert(
          "Failed to update status"
        );
      }
    };

  if (loading) {

    return (
      <div className="p-6">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="space-y-6">

          {applications.map(
            (app) => (

              <div
                key={app._id}
                className="bg-white rounded-xl shadow p-6"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      {
                        app.scheme_id
                          ?.name
                      }
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Application ID:
                      {" "}
                      {app._id}
                    </p>

                    <p className="text-blue-600 mt-2">
                      Status:
                      {" "}
                      {app.status}
                    </p>

                    <p className="text-green-600 mt-1">
                      Payment:
                      {" "}
                      {app.payment_status}
                    </p>

                    <p className="text-purple-600 mt-1">
                      Affidavit:
                      {" "}
                      {app.affidavit_status}
                    </p>

                  </div>

                </div>

                {/* Documents */}

                <div className="mt-6">

                  <h3 className="text-lg font-semibold mb-3">
                    Uploaded Documents
                  </h3>

                  {app.documents
                    ?.length === 0 ? (

                    <p className="text-gray-500">
                      No documents
                    </p>

                  ) : (

                    <div className="space-y-2">

                      {app.documents.map(
                        (
                          doc,
                          index
                        ) => (

                          <div
                            key={index}
                            className="flex justify-between border rounded-lg p-3"
                          >

                            <span>
                              {doc.name}
                            </span>

                            <a
                              href={
                                doc.file_url
                              }
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600"
                            >
                              View
                            </a>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

                {/* Actions */}

                <div className="mt-6 flex gap-4">

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        app._id,
                        "UNDER_REVIEW"
                      )
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Under Review
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        app._id,
                        "APPROVED"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(
                        app._id,
                        "REJECTED"
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;