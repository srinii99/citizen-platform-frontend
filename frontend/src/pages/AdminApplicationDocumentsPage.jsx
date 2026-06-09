import {

  useEffect,

  useState,

} from "react";

import {

  useParams,

} from "react-router-dom";

import toast
from "react-hot-toast";

import {

  getApplicationDocuments,

  verifyDocument,

} from "../api/adminApi";


function AdminApplicationDocumentsPage() {

  const {

    id,

  } = useParams();

  const [

    application,

    setApplication,

  ] = useState(null);


  const loadApplication =
    async () => {

      try {

        const response =

          await getApplicationDocuments(
            id
          );

        setApplication(
          response.data
        );

      } catch (err) {

        toast.error(
          "Failed to load application"
        );
      }
    };


  useEffect(() => {

    loadApplication();

  }, []);


  const handleVerify =
    async (

      documentId,

      status
    ) => {

      try {

        await verifyDocument(

          id,

          documentId,

          {

            verification_status:
              status,

            verification_remarks:
              status === "VERIFIED"

                ? "Verified"

                : "Rejected by admin",
          }
        );

        toast.success(
          "Updated"
        );

        loadApplication();

      } catch {

        toast.error(
          "Update failed"
        );
      }
    };


  if (!application)
    return <div>Loading...</div>;


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">

        Application Documents

      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="mb-4">

          <strong>
            Citizen:
          </strong>{" "}

          {
            application.user_id?.name
          }

        </div>

        <div className="mb-4">

          <strong>
            Scheme:
          </strong>{" "}

          {
            application.scheme_id?.name
          }

        </div>

        <div className="mb-6">

          <strong>
            Status:
          </strong>{" "}

          {
            application.status
          }

        </div>

        {

          application.documents?.map(

            (doc) => (

              <div

                key={doc._id}

                className="border rounded-lg p-4 mb-4"
              >

                <h3 className="font-semibold">

                  {
                    doc.document_name
                  }

                </h3>

                <p>

                  Status:

                  {" "}

                  {
                    doc.verification_status
                  }

                </p>

                <a

                  href={doc.file_url}

                  target="_blank"

                  rel="noreferrer"

                  className="text-blue-600 underline"
                >

                  View Document

                </a>

                <div className="mt-3 flex gap-2">

                  <button

                    onClick={() =>
                      handleVerify(
                        doc._id,
                        "VERIFIED"
                      )
                    }

                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >

                    Approve

                  </button>

                  <button

                    onClick={() =>
                      handleVerify(
                        doc._id,
                        "REJECTED"
                      )
                    }

                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >

                    Reject

                  </button>

                </div>

              </div>
            )
          )
        }

      </div>

    </div>
  );
}

export default AdminApplicationDocumentsPage;