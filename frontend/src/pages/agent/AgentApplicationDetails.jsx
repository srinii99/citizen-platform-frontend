import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api from "../../api/axios";

const AgentApplicationDetails =
  () => {

    const { id } =
      useParams();

    const [
      application,
      setApplication,
    ] = useState(null);

    const [
       remark,
       setRemark,
    ] = useState("");

    const [
        selectedStatus,
        setSelectedStatus,
    ] = useState("");

    useEffect(() => {

      loadApplication();

    }, []);

    const loadApplication =
      async () => {

        try {

          const res =
            await api.get(
              `/applications/${id}`
            );

          setApplication(
            res.data.data
          );

        } catch (err) {

          console.error(err);
        }
      };

    if (!application) {

      return (
        <div className="p-6">
          Loading...
        </div>
      );
    }

    const addRemark =
        async () => {

            try {

            await api.post(
                `/agents/application/${id}/remark`,
                {
                agentId:
                    "6a1f0ebb6557e8da1b8f9dac",

                remark,
                }
            );

            setRemark("");

            loadApplication();

            } catch (err) {

            console.error(err);
            }
        };

    const updateStatus =
        async () => {

            try {

            await api.post(
                `/agents/application/${id}/status`,
                {
                status:
                    selectedStatus,

                remarks:
                    "Updated by agent",
                }
            );

            setSelectedStatus("");

            loadApplication();

            } catch (err) {

            console.error(err);

            alert(
                err?.response?.data?.message ||
                "Failed to update status"
            );
            }
        };

    return (

      <div className="p-6 space-y-6">

        <h1 className="text-2xl font-bold">
          Application Details
        </h1>

        {/* Citizen */}

        <div className="bg-white shadow rounded-xl p-4">

          <h2 className="font-bold mb-2">
            Citizen
          </h2>

          <p>
            Name:
            {" "}
            {
              application.user_id
                ?.name
            }
          </p>

          <p>
            Mobile:
            {" "}
            {
              application.user_id
                ?.mobile
            }
          </p>

        </div>

        {/* Application */}

        <div className="bg-white shadow rounded-xl p-4">

          <h2 className="font-bold mb-2">
            Application
          </h2>

         <p>

            Status:

            {" "}

            <span
                className={
                application.status ===
                "DOCUMENT_VERIFIED"
                

                    ? "bg-green-100 text-green-700 px-2 py-1 rounded"

                    : application.status ===
                    "NEEDS_MORE_INFO"

                    ? "bg-red-100 text-red-700 px-2 py-1 rounded"

                    : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
                }
            >
                {application.status}
            </span>

         </p>

          <p>
            Agency:
            {" "}
            {
              application
                .assigned_agency_id
                ?.name
            }
          </p>

          <p>
            Agent:
            {" "}
            {
              application
                .assigned_agent_id
                ?.name
            }
          </p>

        </div>

        <div className="bg-white shadow rounded-xl p-4">

            <h2 className="font-bold mb-4">
                Update Status
            </h2>

            <select
                value={selectedStatus}
                onChange={(e) =>
                setSelectedStatus(
                    e.target.value
                )
                }
                className="border p-2 rounded w-full"
            >

                <option value="">
                Select Status
                </option>

                <option value="UNDER_REVIEW">
                UNDER_REVIEW
                </option>

                <option value="NEEDS_MORE_INFO">
                NEEDS_MORE_INFO
                </option>

                <option value="DOCUMENT_VERIFIED">
                DOCUMENT_VERIFIED
                </option>

            </select>

            <button
                onClick={updateStatus}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
                Update Status
            </button>

            </div>

        {/* Documents */}

        <div className="bg-white shadow rounded-xl p-4">

          <h2 className="font-bold mb-2">
            Documents
          </h2>

            {
                application.documents?.map(
                    (doc) => (

                    <div
                        key={doc._id}
                        className="border-b py-3"
                    >

                        <p className="font-medium">
                        {doc.name}
                        </p>

                        <p className="text-sm text-gray-600">
                        Status: {doc.verification_status}
                        </p>

                        <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600"
                        >
                        View Document
                        </a>

                    </div>
                    )
                )
                }
            

        </div>

        {/* Remarks */}

        <div className="bg-white shadow rounded-xl p-4">

          <h2 className="font-bold mb-2">
            Agent Remarks
          </h2>

          {
            application
              .agent_remarks
              ?.map(
                (remark) => (

                  <div
                    key={remark._id}
                    className="border-b py-2"
                  >

                    {
                      remark.remark
                    }

                  </div>
                )
              )
          }

        <div className="bg-white shadow rounded-xl p-4">

            <h2 className="font-bold mb-4">
                Status History
            </h2>

            {
                application.status_history?.length
                ? (
                    application.status_history.map(
                        (item) => (

                        <div
                            key={item._id}
                            className="border-b py-3"
                        >

                            <p className="font-semibold text-green-600">
                            {item.status}
                            </p>

                            <p className="text-gray-600">
                            {item.admin_remarks}
                            </p>

                            <p className="text-xs text-gray-400">
                            {
                                new Date(
                                item.updated_at
                                ).toLocaleString()
                            }
                            </p>

                        </div>
                        )
                    )
                    )
                : (
                    <p>
                        No status history
                    </p>
                    )
            }

            </div>

        <div className="mt-4">

            <textarea
                value={remark}
                onChange={(e) =>
                setRemark(
                    e.target.value
                )
                }
                className="border w-full p-2 rounded"
                placeholder="Add remark..."
            />

            <button
                onClick={addRemark}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Add Remark
            </button>

            </div>

        </div>

      </div>
    );
  };

export default AgentApplicationDetails;