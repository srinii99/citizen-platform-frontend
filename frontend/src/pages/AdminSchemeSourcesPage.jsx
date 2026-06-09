import { useEffect, useState } from "react";

import {
  getImportStats,
  getImportJobs,
  importSource,
  getLastSyncs,
} from "../api/schemeImportApi";

function AdminSchemeSourcesPage() {

  const [stats, setStats] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  const [lastSyncs, setLastSyncs] =
    useState([]);

  const [selectedSource, setSelectedSource] =
    useState("MYSCHEME");



  useEffect(() => {

    fetchStats();
    fetchJobs();
    fetchLastSyncs();

  }, []);

  const fetchStats =
    async () => {

      try {

        const response =
          await getImportStats();

        console.log("IMPORT STATS RESPONSE");

        console.log(response);

        setStats(
          response.data
        );

    

      } catch (err) {

        console.log(err);
      }
    };

  const fetchLastSyncs =
    async () => {

      const response =
        await getLastSyncs();

      console.log("LAST SYNCS");
      console.log(response);

      setLastSyncs(
        response.data
      );
  };

  const fetchJobs =
    async () => {

      try {

        const response =
          await getImportJobs();

        console.log(
          "IMPORT JOBS RESPONSE"
        );

        console.log(response);

        setJobs(
          response.data
        );

      } catch (err) {

        console.log(err);
      }
    };

        const manualCount =
            stats.find(
                (item) => item._id === "MANUAL"
            )?.count || 0;

            const mySchemeCount =
            stats.find(
                (item) => item._id === "MYSCHEME"
            )?.count || 0;

            const apiSetuCount =
            stats.find(
                (item) => item._id === "APISETU"
            )?.count || 0;

        const handleImport =
          async () => {

            try {

              await importSource(selectedSource);

              await fetchStats();
              await fetchJobs();

              alert(
                `${selectedSource} import completed`
              );

            } catch (err) {

              console.log(err);

              alert(
                "Import failed"
              );
            }
        };

        const totalSources =
          stats.length;

        const totalImports =
          jobs.length;

        const totalImportedSchemes =
          jobs.reduce(
            (sum, job) =>
              sum + job.importedCount,
            0
          );

        const successfulImports =
          jobs.filter(
            (job) =>
              job.status === "SUCCESS"
          ).length;

        const successRate =
          totalImports > 0
            ? Math.round(
                (successfulImports /
                  totalImports) *
                  100
              )
            : 0;

        return (
            <div className="p-6">

                <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Scheme Sources
                </h1>
            <div className="flex gap-3">

              <select
                value={selectedSource}
                onChange={(e) =>
                  setSelectedSource(
                    e.target.value
                  )
                }
                className="border rounded-lg px-4 py-3"
              >

                <option value="MYSCHEME">
                  MyScheme
                </option>

                <option value="APISETU">
                  API Setu
                </option>

              </select>

              <button
                onClick={handleImport}
                className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
              >
                Import Source
              </button>

            </div>

                </div>

                <div className="grid md:grid-cols-3 gap-6">

  


        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">
            Manual Schemes
            </h3>

            <p className="text-4xl font-bold mt-2">
            {manualCount}
            </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">
            MyScheme
            </h3>

            <p className="text-4xl font-bold mt-2">
            {mySchemeCount}
            </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-500 text-sm">
            API Setu
            </h3>

            <p className="text-4xl font-bold mt-2">
            {apiSetuCount}
            </p>
        </div>

        </div>

  <div className="mt-10">

    <h2 className="text-2xl font-bold mb-4">
      Import Analytics
    </h2>

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Total Sources
        </p>

        <p className="text-3xl font-bold mt-2">
          {totalSources}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Total Imports
        </p>

        <p className="text-3xl font-bold mt-2">
          {totalImports}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Imported Schemes
        </p>

        <p className="text-3xl font-bold mt-2">
          {totalImportedSchemes}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-500 text-sm">
          Success Rate
        </p>

        <p className="text-3xl font-bold mt-2 text-green-600">
          {successRate}%
        </p>
      </div>

    </div>

  </div>

  <div className="mt-10">

    <h2 className="text-2xl font-bold mb-4">
      Last Sync Status
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      {lastSyncs.map((item) => {

        const syncAgeHours =
          (new Date() -
            new Date(item.lastSync))
            / (1000 * 60 * 60);

        const health =
          item.status === "FAILED"
            ? "FAILED"
            : syncAgeHours > 24
            ? "STALE"
            : "HEALTHY";

        const syncAgeMinutes =
          Math.floor(
            (new Date() -
              new Date(item.lastSync))
              / (1000 * 60)
          );

        let syncAgeText = "";

        if (syncAgeMinutes < 60) {

          syncAgeText =
            `${syncAgeMinutes} minutes ago`;

        } else if (syncAgeMinutes < 1440) {

          syncAgeText =
            `${Math.floor(
              syncAgeMinutes / 60
            )} hours ago`;

        } else {

          syncAgeText =
            `${Math.floor(
              syncAgeMinutes / 1440
            )} days ago`;
        }
        
        return (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow p-6"
        >

          <div className="flex justify-between items-center">

            <h3 className="font-semibold text-lg">
              {item._id}
            </h3>

            <span
              className={`px-2 py-1 rounded-full text-sm ${
                health === "HEALTHY"
                  ? "bg-green-100 text-green-800"
                  : health === "STALE"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {health=== "HEALTHY"
                ? "🟢 HEALTHY"
                : health === "STALE"
                ? "🟡 STALE"
                : "🔴 FAILED"}
            </span>


          </div>

          <p className="text-gray-500 text-sm mt-4">
            Last Sync
          </p>

          <p className="font-medium">
            {syncAgeText} 
          </p>

          <p className="text-gray-500 text-sm mt-2">
            {new Date(
              item.lastSync
            ).toLocaleString()}
          </p>

        </div>

          );

      })}

    </div>

  </div>


    <div className="mt-10">

                  <h2 className="text-2xl font-bold mb-4">
                    Recent Imports
                  </h2>

                  <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                      <thead className="bg-gray-100">

                        <tr>

                          <th className="text-left p-4">
                            Source
                          </th>

                          <th className="text-left p-4">
                            Status
                          </th>

                          <th className="text-left p-4">
                            Imported
                          </th>

                          <th className="text-left p-4">
                            Time
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {jobs.map((job) => (

                          <tr
                            key={job._id}
                            className="border-t"
                          >

                            
                            <td className="p-4">

                              <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                {job.source}
                              </span>

                            </td>
                           

                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  job.status === "SUCCESS"
                                    ? "bg-green-100 text-green-800"
                                    : job.status === "FAILED"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {job.status}
                              </span>
                            </td>

                      
                            <td className="p-4 font-semibold">

                              {job.importedCount}
                            </td>

                            <td className="p-4">
                              {new Date(
                                job.createdAt
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
}

export default AdminSchemeSourcesPage;