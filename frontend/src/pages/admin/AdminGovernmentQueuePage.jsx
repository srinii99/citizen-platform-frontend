import {
  useEffect,
  useState,
} from "react";


import {
  getGovernmentQueue,
} from "../../api/governmentApi";

import {
  updateApplicationStatus,
} from "../../api/adminApplicationApi";

const AdminGovernmentQueuePage =
  () => {

    const [
      applications,
      setApplications,
    ] = useState([]);

    const [
        allApplications,
        setAllApplications,
    ] = useState([]);

    const [
        statusFilter,
        setStatusFilter,
    ] = useState("ALL");

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
        selectedApplication,
        setSelectedApplication,
    ] = useState(null);

    useEffect(() => {

      loadQueue();

    }, [statusFilter]);

    const loadQueue =
      async () => {


        try {

          const allRes =
            await getGovernmentQueue(
                "ALL"
            );

            setAllApplications(
            allRes.data || []
            );

          

          const res =
            await getGovernmentQueue(statusFilter);

   

     

          setApplications(
            res.data || []
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
          Loading Government Queue...
        </div>
      );
    }



    const handleGovernmentStatusUpdate =
        async (
            applicationId,
            status,
            remarks = ""
        ) => {

            try {

            await updateApplicationStatus(
                applicationId,
                {
                status,
                remarks,
                }
            );

            await loadQueue();

            } catch (err) {

            console.error(err);
            }
        };

    const confirmUpdate = (
        id,
        status,
        remarks = ""
        ) => {

        if (
            !window.confirm(
            `Change status to ${status}?`
            )
        ) {
            return;
        }

        handleGovernmentStatusUpdate(
            id,
            status,
            remarks
        );
        };

    const pendingReviewCount =
        allApplications.filter(
            (app) =>
            app.status ===
            "GOVT_UNDER_REVIEW"
        ).length;

        const approvedCount =
        allApplications.filter(
            (app) =>
            app.status ===
            "APPROVED"
        ).length;

        const rejectedCount =
        allApplications.filter(
            (app) =>
            app.status ===
            "REJECTED"
        ).length;

        const disbursedCount =
        allApplications.filter(
            (app) =>
            app.status ===
            "BENEFIT_DISBURSED"
        ).length;

        const totalProcessedCount =
        approvedCount +
        rejectedCount +
        disbursedCount;
   

    return (

      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">

          Government Queue

        </h1>

        <div className="grid grid-cols-5 gap-4 mb-6">


                <div
                onClick={() =>
                    setStatusFilter("ACTIVE")
                }
                className={`
                    rounded-xl
                    shadow
                    p-4
                    cursor-pointer
                    hover:shadow-lg

                    ${
                    statusFilter === "ACTIVE"

                        ? "bg-blue-50 border-2 border-blue-500"

                        : "bg-white"
                    }
                `}
                >

                <div className="text-sm text-gray-500">
                    Pending Review
                </div>

                <div className="text-2xl font-bold text-red-600">
                    {pendingReviewCount}
                </div>

            </div>




                <div
                onClick={() =>
                    setStatusFilter("APPROVED")
                }
                className={`
                    rounded-xl
                    shadow
                    p-4
                    cursor-pointer
                    hover:shadow-lg

                    ${
                    statusFilter === "APPROVED"

                        ? "bg-green-50 border-2 border-green-500"

                        : "bg-white"
                    }
                `}
                >

                <div className="text-sm text-gray-500">
                    Approved
                </div>

                <div className="text-2xl font-bold text-red-600">
                    {approvedCount}
                </div>

            </div>

            <div
                onClick={() =>
                    setStatusFilter("REJECTED")
                }
                className={`
                    rounded-xl
                    shadow
                    p-4
                    cursor-pointer
                    hover:shadow-lg

                    ${
                    statusFilter === "REJECTED"

                        ? "bg-red-50 border-2 border-red-500"

                        : "bg-white"
                    }
                `}
                >

                <div className="text-sm text-gray-500">
                    Rejected
                </div>

                <div className="text-2xl font-bold text-red-600">
                    {rejectedCount}
                </div>

            </div>

            <div
                onClick={() =>
                    setStatusFilter("BENEFIT_DISBURSED")
                }
                className={`
                    rounded-xl
                    shadow
                    p-4
                    cursor-pointer
                    hover:shadow-lg

                    ${
                    statusFilter === "BENEFIT_DISBURSED"

                        ? "bg-purple-50 border-2 border-purple-500"

                        : "bg-white"
                    }
                `}
                >

                <div className="text-sm text-gray-500">
                    Disbursed
                </div>

                <div className="text-2xl font-bold text-red-600">
                    {disbursedCount}
                </div>

            </div>

             <div
                onClick={() =>
                    setStatusFilter("ALL")
                }
                className={`
                    rounded-xl
                    shadow
                    p-4
                    cursor-pointer
                    hover:shadow-lg

                    ${
                    statusFilter === "ALL"

                        ? "bg-gray-50 border-2 border-gray-500"

                        : "bg-white"
                    }
                `}
                >

                <div className="text-sm text-gray-500">
                    Total Processed
                </div>

                <div className="text-2xl font-bold text-red-600">
                    {totalProcessedCount}
                </div>

            </div>

            </div>



        <div className="flex items-center gap-4 mb-4">

            <select
                value={statusFilter}
                onChange={(e) =>
                setStatusFilter(
                    e.target.value
                )
                }
                className="
                border
                rounded
                px-3
                py-2
                "
            >

                <option value="ALL">
                All Applications
                </option>

                <option value="ACTIVE">
                Active Queue
                </option>

                <option value="APPROVED">
                Approved
                </option>

                <option value="REJECTED">
                Rejected
                </option>

                <option value="BENEFIT_DISBURSED">
                Disbursed
                </option>

            </select>

            <span
                className="
                text-sm
                text-gray-600
                font-medium
                "
            >
                {applications.length} Applications
            </span>

        </div>

     

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  Citizen
                </th>

                <th className="p-3 text-left">
                  Department
                </th>

                <th className="p-3 text-left">
                  Reference No
                </th>

                <th className="p-3 text-left">
                  Govt Status
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Actions
                </th>

            

                <th className="p-3 text-left">
                  Lifecycle
                </th>

                <th className="p-3 text-left">
                  Timeline
                </th>



              </tr>

            </thead>

            <tbody>

              {
                applications.length === 0
                ? (
                    <tr>

                      <td
                        colSpan="5"
                        className="p-6 text-center"
                      >
                        No applications in queue
                      </td>

                    </tr>
                  )
                : (
                    applications.map(
                      (app) => (

                        <tr
                          key={app._id}
                          className="border-t"
                        >

                          <td className="p-3">
                            {
                              app.user_id
                                ?.mobile
                            }
                          </td>

                          <td className="p-3">
                            {
                              app.govt_department
                            }
                          </td>

                          <td className="p-3">
                            {
                              app.govt_reference_number
                            }
                          </td>

                          <td className="p-3">
                            {
                              app.govt_status
                            }
                          </td>

                          <td className="p-3">

                            <span
                                className={
                                app.status ===
                                "FORWARDED_TO_GOVT"

                                    ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded"

                                    : app.status ===
                                    "GOVT_UNDER_REVIEW"

                                    ? "bg-blue-100 text-blue-700 px-2 py-1 rounded"

                                    : app.status ===
                                    "APPROVED"

                                    ? "bg-green-100 text-green-700 px-2 py-1 rounded"

                                    : app.status ===
                                    "REJECTED"

                                     ? "bg-red-100 text-red-700 px-2 py-1 rounded"

                                    : app.status === "BENEFIT_DISBURSED"

                                     ? "bg-green-700 text-white px-2 py-1 rounded"

                                    : "bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                }
                            >
                                {app.status}
                            </span>

                            </td>
                            <td className="p-3">

                                {
                                    app.status ===
                                    "FORWARDED_TO_GOVT" && (

                                    <button
                             
                                        onClick={() =>
                                            handleGovernmentStatusUpdate(
                                                app._id,
                                                "GOVT_UNDER_REVIEW",
                                                "Application received by department"
                                            )
                                        }
                                        className="
                                            bg-blue-600
                                            text-white
                                            px-3
                                            py-1
                                            rounded
                                          "
                                        >
                                        Start Review
                                       
                                    
                                    </button>
                                    )
                                    }
                       




                                {
                                    app.status ===
                                    "GOVT_UNDER_REVIEW" && (

                                    <div className="flex gap-2">

                                        <button
                                          onClick={() =>
                                            
                                            confirmUpdate(
                                                app._id,
                                                "APPROVED",
                                                "Application approved by department"
                                            )
                                        }
                                        className="
                                            bg-green-600
                                            text-white
                                            px-3
                                            py-1
                                            rounded
                                        "
                                        >
                                        Approve
                                        </button>

                                        <button
                                        onClick={() =>
                                            confirmUpdate(
                                                app._id,
                                                "REJECTED",
                                                "Application rejected by department"
                                            )
                                        }


                                        className="
                                            bg-red-600
                                            text-white
                                            px-3
                                            py-1
                                            rounded
                                        "
                                        >
                                        Reject
                                        </button>

                                    </div>
                                    )
                                }

                                

                                {
                                    app.status ===
                                    "APPROVED" && (

                                    <button
                                    onClick={() =>
                                        handleGovernmentStatusUpdate(
                                            app._id,
                                            "BENEFIT_DISBURSED",
                                            "Benefit credited to citizen account"
                                        )
                                    }


                                        className="
                                        bg-purple-600
                                        text-white
                                        px-3
                                        py-1
                                        rounded
                                        "
                                    >
                                        Mark Disbursed
                                    </button>
                                    )
                                }

                                {
                                    app.status ===
                                    "BENEFIT_DISBURSED" && (

                                        <span
                                        className="
                                            text-green-600
                                            font-semibold
                                        "
                                        >
                                        Completed
                                        </span>
                                    )
                                }


                            </td>
                          

                             
                                <td className="p-3">

                                    {app.status === "BENEFIT_DISBURSED" ? (

                                        <span
                                        className="
                                            px-3 py-1
                                            bg-green-100
                                            text-green-700
                                            rounded-full
                                            font-semibold
                                        "
                                        >
                                        Completed
                                        </span>

                                    ) : (

                                        <span>
                                        Government Processing
                                        </span>

                                    )}

                                    </td>

                                <td className="p-3">

                                    <button
                                        onClick={() =>
                                        setSelectedApplication(app)
                                        }
                                        className="
                                        text-blue-600
                                        hover:underline
                                        "
                                    >
                                        View Timeline
                                    </button>

                                </td>

                              

                        

                        </tr>
                      )
                    )
                  )
              }

            </tbody>

          </table>

        </div>

        {selectedApplication && (

            <div
                className="
                fixed
                inset-0
                bg-black
                bg-opacity-50
                flex
                items-center
                justify-center
                z-50
                "
            >

                <div
                className="
                    bg-white
                    rounded-xl
                    p-6
                    w-[700px]
                    max-h-[80vh]
                    overflow-y-auto
                "
                >

                <div className="flex justify-between mb-4">

                    <h2 className="text-xl font-bold">
                    Application Timeline
                    </h2>

                    <button
                    onClick={() =>
                        setSelectedApplication(null)
                    }
                    className="
                        text-red-600
                        font-semibold
                    "
                    >
                    Close
                    </button>

                </div>
                    <div
                        className="
                            grid
                            grid-cols-3
                            gap-4
                            mb-6
                        "
                        >

                        <div
                            className="
                            bg-gray-50
                            p-3
                            rounded-lg
                            "
                        >
                            <div className="text-xs text-gray-500">
                            Forwarded To Govt
                            </div>

                            <div className="font-semibold">
                            {
                                selectedApplication
                                ?.forwarded_to_govt_at
                                ? new Date(
                                    selectedApplication.forwarded_to_govt_at
                                    ).toLocaleDateString()
                                : "-"
                            }
                            </div>
                        </div>

                        <div
                            className="
                            bg-gray-50
                            p-3
                            rounded-lg
                            "
                        >
                            <div className="text-xs text-gray-500">
                            Decision Date
                            </div>

                            <div className="font-semibold">
                            {
                                selectedApplication?.approved_at
                                ? new Date(
                                    selectedApplication.approved_at
                                    ).toLocaleDateString()

                                : selectedApplication?.rejected_at
                                ? new Date(
                                    selectedApplication.rejected_at
                                    ).toLocaleDateString()

                                : "Pending"
                            }
                            </div>
                        </div>

                        <div
                            className="
                            bg-gray-50
                            p-3
                            rounded-lg
                            "
                        >
                            <div className="text-xs text-gray-500">
                            Processing Days
                            </div>

                            <div className="font-semibold">

                                {

                                    selectedApplication?.forwarded_to_govt_at &&

                                    (
                                    selectedApplication?.approved_at ||
                                    selectedApplication?.rejected_at
                                    )

                                    ? Math.ceil(

                                        (
                                            new Date(

                                            selectedApplication.approved_at ||

                                            selectedApplication.rejected_at

                                            ) -

                                            new Date(
                                            selectedApplication.forwarded_to_govt_at
                                            )

                                        )

                                        /

                                        (
                                            1000 *
                                            60 *
                                            60 *
                                            24
                                        )

                                        )

                                    : "Pending"

                                }

                                {" "}
                                Days

                                </div>

                            
                        </div>

                        </div>
                    <div className="space-y-4">

                        {selectedApplication
                            ?.status_history
                            ?.map((item, index) => (

                            <div
                                key={index}
                                className="
                                border-l-4
                                border-blue-500
                                pl-4
                                pb-4
                                "
                            >

                              
                                <span
                                    className={
                                        item.status === "APPROVED"

                                        ? "bg-green-100 text-green-700 px-2 py-1 rounded"

                                        : item.status === "REJECTED"

                                        ? "bg-red-100 text-red-700 px-2 py-1 rounded"

                                        : item.status === "GOVT_UNDER_REVIEW"

                                        ? "bg-blue-100 text-blue-700 px-2 py-1 rounded"

                                        : item.status === "FORWARDED_TO_GOVT"

                                        ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded"

                                        : "bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                    }
                                    >
                                    {item.status}
                                    </span>
                             

                                <div
                                className="
                                    text-sm
                                    text-gray-500
                                "
                                >
                                {
                                    item.updated_at
                                    ? new Date(
                                        item.updated_at
                                        ).toLocaleString()
                                    : "-"
                                }
                                </div>

                                {item.admin_remarks && (

                                <div
                                    className="
                                    text-sm
                                    text-gray-700
                                    mt-1
                                    "
                                >
                                    {item.admin_remarks}
                                </div>

                                )}

                            </div>

                            ))}

                        </div>


                </div>

            </div>

            )}

      </div>
    );
  };

export default AdminGovernmentQueuePage;