import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getApplicationById,
  uploadDocument,
  generateAffidavit,
} from "../api/applicationApi";

import {
  createPaymentOrder,
  verifyPayment,
} from "../api/applicationApi";

const ApplicationTrackerPage = () => {

  const { id } =
    useParams();

  const [application,
    setApplication] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  const [selectedFile,
    setSelectedFile] =
      useState(null);

  const [affidavitFile,
    setAffidavitFile] =
      useState(null);

  useEffect(() => {
    loadApplication();
  }, []);

  const loadApplication =
    async () => {

      try {

        const res =
          await getApplicationById(
            id
          );

        setApplication(
          res.data
        );

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

  const handleUpload =
    async () => {

      if (!selectedFile) {

        alert(
          "Please select a file"
        );

        return;
      }

      try {

        const formData =
          new FormData();

        formData.append(
          "document",
          selectedFile
        );

        formData.append(
          "name",
          selectedFile.name
        );

        const res =
          await uploadDocument(
            application._id,
            formData
          );

        setApplication(
          res.data
        );

        setSelectedFile(null);

        alert(
          "Document uploaded successfully"
        );

      } catch (err) {

        console.error(err);

        alert(
          "Upload failed"
        );
      }
    };

  const handleGenerateAffidavit =
    async () => {

      try {

        const res =
          await generateAffidavit(
            application._id,
             "INCOME_AFFIDAVIT"
          );

        setAffidavitFile(
          `http://localhost:3000${res.file}`
        );

        setApplication({
          ...application,
          affidavit_status:
            "GENERATED",
        });

        alert(
          "Affidavit generated successfully"
        );

      } catch (err) {

        console.error(err);

        alert(
          "Failed to generate affidavit"
        );
      }
    };

  if (loading) {

    return (
      <div className="p-6">
        Loading application...
      </div>
    );
  }

  if (!application) {

    return (
      <div className="p-6">
        Application not found
      </div>
    );
  }

  const handlePayment =
    async () => {

      try {

        // Create order
        const res =
          await createPaymentOrder(
            application._id,
            100
          );

        const {
          order,
          payment,
        } = res;

        const options = {

          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "Citizen Platform",

          description:
            "Application Fee",

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {

              try {

                await verifyPayment({

                  razorpay_order_id:
                    response
                      .razorpay_order_id,

                  razorpay_payment_id:
                    response
                      .razorpay_payment_id,

                  razorpay_signature:
                    response
                      .razorpay_signature,

                  payment_id:
                    payment._id,
                });

                setApplication({
                  ...application,
                  payment_status:
                    "PAID",
                });

                alert(
                  "Payment successful"
                );

              } catch (err) {

                console.error(err);

                alert(
                  "Payment verification failed"
                );
              }
            },

          theme: {
            color:
              "#2563eb",
          },
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (err) {

        console.error(err);

        alert(
          "Payment failed"
        );
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Application Tracker
        </h1>

        <p className="text-gray-500 mb-8">
          Track your scheme application progress
        </p>

        {/* Scheme Info */}

        <div className="mb-8">

          <h2 className="text-2xl font-semibold text-gray-800">
            {
              application.scheme_id
                ?.title
            }
          </h2>

          <p className="text-blue-600 mt-1">
            {
              application.scheme_id
                ?.department
            }
          </p>

        </div>

        {/* Status Cards */}

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">

            <h3 className="text-sm text-gray-500">
              Application Status
            </h3>

            <p className="text-xl font-bold text-blue-700 mt-2">
              {
                application.status
              }
            </p>

          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">

            <h3 className="text-sm text-gray-500">
              Payment Status
            </h3>

            <p className="text-xl font-bold text-yellow-700 mt-2">
              {
                application.payment_status
              }
            </p>

          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4">

            <h3 className="text-sm text-gray-500">
              Affidavit Status
            </h3>

            <p className="text-xl font-bold text-green-700 mt-2">
              {
                application.affidavit_status
              }
            </p>

          </div>

        </div>

        {/* APPLICATION TIMELINE */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-6">

            Application Timeline

          </h2>

          {
            !application.status_history ||

            application.status_history.length === 0 ? (

              <p className="text-gray-500">

                No status history available

              </p>

            ) : (

              <div className="space-y-6">

                {
                  application.status_history.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex gap-4"
                      >

                        {/* DOT */}

                        <div className="flex flex-col items-center">

                          <div className="w-4 h-4 rounded-full bg-blue-600" />

                          {
                            index !==
                            application
                              .status_history
                              .length - 1 && (

                              <div className="w-1 h-16 bg-gray-300 mt-1" />
                            )
                          }

                        </div>

                        {/* CONTENT */}

                        <div className="bg-gray-50 rounded-lg p-4 flex-1">

                          <h3 className="font-bold text-lg text-gray-800">

                            {
                              item.status
                            }

                          </h3>

                          <p className="text-sm text-gray-500 mt-1">

                            {
                              new Date(
                                item.updated_at
                              ).toLocaleString()
                            }

                          </p>

                          {
                           
                            item.admin_remarks && (

                              <p className="mt-2 text-gray-700">

                                {
                                 
                                  item.admin_remarks
                                }

                              </p>
                            )
                          }

                        </div>

                      </div>
                    )
                  )
                }

              </div>
            )
          }

        </div>

        {/* Upload Documents */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">
            Upload Documents
          </h2>

          <div className="flex gap-4">

            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(
                  e.target.files[0]
                )
              }
              className="border p-2 rounded-lg bg-white"
            />

            <button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Upload
            </button>

          </div>

        </div>

        {/* Affidavit */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">
            Affidavit
          </h2>

          <div className="flex gap-4 items-center">

            <button
              onClick={
                handleGenerateAffidavit
              }
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Generate Affidavit
            </button>

            {affidavitFile && (

              <a
                href={affidavitFile}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Affidavit
              </a>
            )}

          </div>

        </div>

        {/* payment button */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">
            Payment
          </h2>

          <button
            onClick={handlePayment}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
          >
            Pay Application Fee
          </button>

        </div>

        {/* Uploaded Documents */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">
            Uploaded Documents
          </h2>

          {application.documents
            ?.length === 0 ? (

            <p className="text-gray-500">
              No documents uploaded yet
            </p>

          ) : (

            <div className="space-y-2">

              {application.documents.map(
                (doc, index) => (

                  <div
                    key={index}
                    className="border rounded-lg p-3 flex justify-between"
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

      </div>
    </div>
  );
};

export default ApplicationTrackerPage;