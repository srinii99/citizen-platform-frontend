import { useEffect, useState } from "react";


import {
  getImportMonitoringSummary,
  getImportHistory,
} from "../services/importMonitoringService";

const AdminImportMonitoringPage = () => {

  const [loading, setLoading] =
    useState(true);

  const [history, setHistory] =
    useState([]);

  const [sources, setSources] =
    useState([]);

  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  useEffect(() => {

    loadData();

  }, []);

  const loadData = async () => {

    try {

        setLoading(true);

        const response =
        await getImportMonitoringSummary();

        setSources(
        response.data || []
        );

        setLastUpdated(
            new Date()
        );

        const historyResponse =
          await getImportHistory();

        setHistory(
          historyResponse.data || []
        );

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);
    }
   };

  if (loading && sources.length === 0) {

    return (
        <div className="p-6">
        Loading...
        </div>
    );
  }


  return (

    <div className="p-6">

        <div className="flex items-center justify-between mb-6">

            <div>

                <h1 className="text-4xl font-bold">
                Import Monitoring
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                Last updated:
                {" "}
                {lastUpdated.toLocaleString()}
                </p>

            </div>

            <button
                onClick={loadData}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Refreshing..." : "Refresh"}
            </button>

        </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
            Sources
            </p>

            <h2 className="text-3xl font-bold">
            {sources.length}
            </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
            Imported Schemes
            </p>

            <h2 className="text-3xl font-bold">
            {
                sources.reduce(
                (sum, item) =>
                    sum + item.imported,
                0
                )
            }
            </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
            Active Schemes
            </p>

            <h2 className="text-3xl font-bold">
            {
                sources.reduce(
                (sum, item) =>
                    sum + item.active,
                0
                )
            }
            </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">
            Failed Imports
            </p>

            <h2 className="text-3xl font-bold">
            {
                sources.reduce(
                (sum, item) =>
                    sum + item.failed,
                0
                )
            }
            </h2>
        </div>

        </div>

    

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Source
              </th>

              <th className="text-left p-4">
                Enabled
              </th>

              <th className="text-left p-4">
                Imported
              </th>

              <th className="text-left p-4">
                Active
              </th>

              <th className="text-left p-4">
                Failed
              </th>

              <th className="text-left p-4">
                Status
              </th>

               <th className="text-left p-4">
                Last Sync
              </th>

         

            </tr>

          </thead>

          <tbody>

            {sources.map((source) => (

              <tr
                key={source.source}
                className="border-t"
              >

                <td className="p-4">
                  {source.source}
                </td>

                <td className="p-4">

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                    source.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                    {source.enabled
                    ? "Enabled"
                    : "Disabled"}
                </span>

                </td>

                <td className="p-4">
                  {source.imported}
                </td>

                <td className="p-4">
                  {source.active}
                </td>

                <td className="p-4">
                  {source.failed}
                </td>


                <td className="p-4">

                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                        source.lastStatus === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : source.lastStatus === "FAILED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {source.lastStatus}
                    </span>

                </td>


                <td className="p-4">
                   {source.lastSync
                      ? new Date(
                           source.lastSync
                        ).toLocaleString()
                      : "-"}
                </td>

                


              </tr>

            ))}

          </tbody>

        </table>

      </div>
            <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
            Recent Import History
        </h2>

        <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

            <thead className="bg-gray-100">

                <tr>

                <th className="text-left p-4">
                    Source
                </th>

                <th className="text-left p-4">
                    Imported
                </th>

                <th className="text-left p-4">
                    Status
                </th>

                <th className="text-left p-4">
                    Started
                </th>

                <th className="text-left p-4">
                    Completed
                </th>

                </tr>

            </thead>

            <tbody>

                {history.map((job) => (

                    <tr
                    key={job._id}
                    className="border-t"
                    >

                    <td className="p-4">
                        {job.source}
                    </td>

                    <td className="p-4">
                        {job.importedCount}
                    </td>

                    <td className="p-4">

                        <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job.status === "SUCCESS"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        >
                        {job.status}
                        </span>

                    </td>

                    <td className="p-4">
                        {new Date(
                        job.startedAt
                        ).toLocaleString()}
                    </td>

                    <td className="p-4">
                        {new Date(
                        job.completedAt
                        ).toLocaleString()}
                    </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

        </div>
      

    </div>
  );
};

export default AdminImportMonitoringPage;