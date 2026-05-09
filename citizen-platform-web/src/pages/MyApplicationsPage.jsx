import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getApplications,
} from "../api/applicationApi";

const MyApplicationsPage = () => {

  const navigate =
    useNavigate();

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
          await getApplications();

        setApplications(
          res.data
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (
      <div className="p-6">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            My Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Track and manage all your scheme applications
          </p>

        </div>

        {applications.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Start applying for government schemes
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-6">

            {applications.map(
              (app) => (

                <div
                  key={app._id}
                  className="bg-white rounded-xl shadow border p-6"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-2xl font-bold text-gray-800">
                        {
                          app.scheme_id
                            ?.name
                        }
                      </h2>

                      <p className="text-blue-600 mt-1">
                        {
                          app.scheme_id
                            ?.category
                        }
                      </p>

                    </div>

                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {
                        app.status
                      }
                    </div>

                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        Payment
                      </p>

                      <p className="font-semibold">
                        {
                          app.payment_status
                        }
                      </p>

                    </div>

                    <div>

                      <p className="text-sm text-gray-500">
                        Affidavit
                      </p>

                      <p className="font-semibold">
                        {
                          app.affidavit_status
                        }
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/applications/${app._id}`
                      )
                    }
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                  >
                    Continue Application
                  </button>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplicationsPage;