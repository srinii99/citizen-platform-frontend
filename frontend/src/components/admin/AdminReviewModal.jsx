import {
  useState,
} from "react";



import {
  FiX,
} from "react-icons/fi";

import {
  getDocumentViewUrl,
  verifyDocument,
} from "../../api/adminApi";


const STATUS_OPTIONS = [

  "UNDER_REVIEW",

  "FORWARDED_TO_GOVT",

  "GOVT_UNDER_REVIEW",

  "APPROVED",

  "REJECTED",
];


const AdminReviewModal = ({

  open,

  application,

  onClose,

  onStatusUpdate,
  refreshApplications,
  refreshSelectedApplication,

}) => {

  console.log("MODAL PROPS", {
    onStatusUpdate,
    type: typeof onStatusUpdate
  });

  const [selectedStatus,
    setSelectedStatus] =
    useState("");

  const [remarks,
    setRemarks] =
    useState("");

  const [govtDepartment,
    setGovtDepartment] =
    useState("");

  const [govtReferenceNumber,
    setGovtReferenceNumber] =
    useState("");


  if (!open || !application) {

    return null;
  }

  const handleViewDocument =
    async (doc) => {

      try {

        const response =
          await getDocumentViewUrl(

            application._id,

            doc._id
          );

        window.open(

          response.url,

          "_blank"
        );

      } catch (err) {

        console.log(err);
      }
    };

  const handleVerifyDocument =
    async (doc) => {

      try {

        await verifyDocument(

          application._id,

          doc._id,

          {

            verification_status:
              "VERIFIED",

            verification_remarks:
              "Verified by admin",
          }
        );
        await refreshApplications(
          application._id
        );
        await refreshSelectedApplication(
          application._id
        );
        alert(
          "Document verified successfully"
        );

      } catch (err) {

        console.log(err);
      }
    };

  const handleSubmit =
    async () => {

      if (!selectedStatus) {

        return;
      }

      await onStatusUpdate(
        application._id,
        selectedStatus,
        remarks,
        govtDepartment,
        govtReferenceNumber
      );
    
    };
  return (


    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-50
        flex
        items-center
        justify-center
        p-4
      "
    >

      <div
        className="
          bg-white
          w-full
          max-w-2xl
          rounded-2xl
          shadow-2xl
          overflow-hidden
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            px-6
            py-4
          "
        >

          <div>

            <h2 className="text-2xl font-bold text-gray-800">

              Review Application

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              Manage governance workflow

            </p>

          </div>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
            "
          >

            <FiX size={20} />

          </button>

        </div>


        {/* BODY */}

        <div className="p-6 space-y-6">

          {/* APPLICATION INFO */}

          <div
            className="
              border
              rounded-xl
              p-4
              bg-gray-50
            "
          >

            <h3 className="text-lg font-semibold text-gray-800">

              {
                application.scheme_id
                  ?.title
              }

            </h3>

            <p className="text-sm text-gray-500 mt-1">

              Applicant:
              {" "}
              {
                application.user_id
                  ?.name
              }

            </p>

            <p className="text-sm text-gray-500">

              Mobile:
              {" "}
              {
                application.user_id
                  ?.mobile
              }

            </p>

            <div className="mt-3">

              <span
                className="
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  bg-blue-100
                  text-blue-700
                  font-medium
                "
              >

                Current Status:
                {" "}
                {application.status}

              </span>

            </div>

          </div>

          {/* DOCUMENTS */}

          <div>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">

              Uploaded Documents

            </h3>

            {
              application.documents?.length > 0 ? (

                <div className="space-y-3">

                  {
                    application.documents.map((doc) => (

                      <div
                        key={doc._id}
                        className="
                          border
                          rounded-lg
                          p-3
                          flex
                          justify-between
                          items-center
                        "
                      >

                
                        <div className="flex items-center gap-2">

                          <p className="text-sm text-gray-500">
                            {doc.verification_status}
                          </p>

                          {doc.verification_status === "VERIFIED" && (
                            <span
                              className="
                                px-2
                                py-1
                                text-xs
                                rounded-full
                                bg-green-100
                                text-green-700
                                font-medium
                              "
                            >
                              VERIFIED
                            </span>
                          )}

                        </div>


                        
                      
                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              handleViewDocument(doc)
                            }
                            className="
                              text-blue-600
                              font-medium
                            "
                          >
                            View
                          </button>
                          

                        {doc.verification_status !== "VERIFIED" && (
                          <button
                            onClick={() =>
                              handleVerifyDocument(doc)
                            }
                            className="
                              text-green-600
                              font-medium
                            "
                          >
                            Verify
                          </button>
                        )}

                        </div>
                      
                        

                      </div>
                    ))
                  }

                </div>

              ) : (

                <p className="text-gray-500">

                  No documents uploaded

                </p>

              )
            }

          </div>


          {/* STATUS */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Update Status

            </label>

            <select

              value={selectedStatus}

              onChange={(e) =>
                setSelectedStatus(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-xl
                p-3
              "
            >

              <option value="">

                Select Status

              </option>

              {
                STATUS_OPTIONS.map(
                  (status) => (

                    <option
                      key={status}
                      value={status}
                    >

                      {status}

                    </option>
                  )
                )
              }

            </select>

          </div>


          {/* GOVT FORWARDING */}

          {
            selectedStatus ===
            "FORWARDED_TO_GOVT" && (

              <div className="space-y-4">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Government Department

                  </label>

                  <input
                    type="text"

                    placeholder="Agriculture Department"

                    value={govtDepartment}

                    onChange={(e) =>
                      setGovtDepartment(
                        e.target.value
                      )
                    }

                    className="
                      w-full
                      border
                      rounded-xl
                      p-3
                    "
                  />

                </div>


                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">

                    Government Reference Number

                  </label>

                  <input
                    type="text"

                    placeholder="GOVT-2026-001"

                    value={govtReferenceNumber}

                    onChange={(e) =>
                      setGovtReferenceNumber(
                        e.target.value
                      )
                    }

                    className="
                      w-full
                      border
                      rounded-xl
                      p-3
                    "
                  />

                </div>

              </div>
            )
          }


          {/* REMARKS */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">

              Remarks

            </label>

            <textarea

              rows={4}

              placeholder="Add admin remarks..."

              value={remarks}

              onChange={(e) =>
                setRemarks(
                  e.target.value
                )
              }

              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>

        </div>


        {/* FOOTER */}

        <div
          className="
            border-t
            px-6
            py-4
            flex
            justify-end
            gap-3
          "
        >

          <button
            onClick={onClose}

            className="
              px-5
              py-2
              rounded-xl
              border
              hover:bg-gray-100
            "
          >

            Cancel

          </button>

          <button
            onClick={handleSubmit}

            className="
              px-5
              py-2
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
            "
          >

            Update Application

          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminReviewModal;