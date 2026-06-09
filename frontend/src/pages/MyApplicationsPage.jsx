import toast
from "react-hot-toast";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getMyApplications,
  submitApplication,
} from "../api/applicationApi";

import DocumentUpload
from "../components/applications/DocumentUpload";


const MyApplicationsPage =
  () => {

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
            await getMyApplications();

          setApplications(
            res || []
          );

        } catch (err) {

          console.error(err);

        } finally {

          setLoading(false);
        }
      };


    // ✅ Submit Final Application

    const handleSubmitApplication =
      async (id) => {

        try {

          const response =
            await submitApplication(
              id
            );

          toast.success(
            response.message
          );

          loadApplications();

        } catch (err) {

          console.log(err);

          toast.error(

            err.response?.data
              ?.message ||

            "Submission failed"
          );
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

          {/* HEADER */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-gray-800">

              My Applications

            </h1>

            <p className="text-gray-500 mt-2">

              Track and manage all your scheme applications

            </p>

          </div>


          {/* EMPTY STATE */}

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
                    className="
                      bg-white
                      rounded-xl
                      shadow
                      border
                      p-6
                    "
                  >

                    {/* HEADER */}

                    <div className="flex justify-between items-start">

                      <div>

                        <h2 className="text-2xl font-bold text-gray-800">

                          {
                            app.scheme_id
                              ?.title
                          }

                        </h2>

                        <p className="text-blue-600 mt-1">

                          {
                            app.scheme_id
                              ?.department
                          }

                        </p>

                      </div>

                      <div
                        className="
                          bg-blue-100
                          text-blue-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-semibold
                        "
                      >

                        {app.status}

                      </div>

                    </div>


                    {/* BENEFITS */}

                    <div className="mt-5">

                      <p className="text-sm text-gray-500">

                        Benefits

                      </p>

                      <p className="font-medium text-green-600 mt-1">

                        {
                          app.scheme_id
                            ?.benefits
                        }

                      </p>

                    </div>


                    {/* REQUIRED DOCUMENTS */}

                    <div className="mt-8">

                      <h3 className="font-semibold text-gray-700 mb-4">

                        Required Documents

                      </h3>

                      <div className="space-y-4">

                        {
                          app.scheme_id
                            ?.documents_required
                            ?.map(

                              (doc, index) => (

                                <div
                                  key={index}
                                  className="
                                    border
                                    rounded-xl
                                    p-4
                                    bg-gray-50
                                  "
                                >

                                  <div className="flex items-center justify-between">

                                    <div>

                                      <p className="font-medium text-gray-800">

                                        {doc}

                                      </p>

                                    </div>

                                  </div>

                                  <div className="mt-4">

                                    <DocumentUpload

                                      applicationId={app._id}

                                      documentName={doc}
                                    />

                                  </div>

                                </div>
                              )
                            )
                        }

                      </div>

                    </div>


                    {/* STATUS */}

                    {/* APPLICATION TIMELINE */}

                    <div className="mt-8">

                      <h3 className="font-semibold text-gray-700 mb-4">

                        Application Timeline

                      </h3>

                      <div className="space-y-4">

                        {
                          app.status_history
                            ?.map((item, index) => (

                              <div
                                key={index}
                                className="flex gap-4"
                              >

                                {/* DOT */}

                                <div className="flex flex-col items-center">

                                  <div
                                    className="
                                      w-4
                                      h-4
                                      rounded-full
                                      bg-blue-600
                                      mt-1
                                    "
                                  />

                                  {
                                    index !==
                                    app.status_history.length - 1 && (

                                      <div
                                        className="
                                          w-1
                                          flex-1
                                          bg-gray-300
                                          mt-1
                                        "
                                      />
                                    )
                                  }

                                </div>


                                {/* CONTENT */}

                                <div
                                  className="
                                    bg-gray-50
                                    border
                                    rounded-xl
                                    p-4
                                    flex-1
                                  "
                                >

                                  <div className="flex justify-between items-center">

                                    <h4 className="font-semibold text-gray-800">

                                      {
                                        item.status
                                          ?.replaceAll(
                                            "_",
                                            " "
                                          )
                                      }

                                    </h4>

                                    <span className="text-xs text-gray-500">

                                      {
                                        new Date(
                                          item.updated_at
                                        ).toLocaleString()
                                      }

                                    </span>

                                  </div>


                                  {
                                    item.admin_remarks && (

                                      <p className="mt-2 text-sm text-gray-600">

                                        {
                                          item.admin_remarks
                                        }

                                      </p>
                                    )
                                  }

                                </div>

                              </div>
                            ))
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


                    {/* ACTIONS */}

                    <div className="mt-8 flex gap-3">

                      <button

                        onClick={() =>
                          navigate(
                            `/applications/${app._id}`
                          )
                        }

                        className="
                          flex-1
                          border
                          border-gray-300
                          hover:bg-gray-100
                          py-3
                          rounded-lg
                        "
                      >

                        View Details

                      </button>


                      {
                        app.status !==
                        "SUBMITTED" && (

                          <button

                            onClick={() =>
                              handleSubmitApplication(
                                app._id
                              )
                            }

                            className="
                              flex-1
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              py-3
                              rounded-lg
                            "
                          >

                            Submit Application

                          </button>
                        )
                      }

                    </div>

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