import { useEffect, useState } from "react";

import {
  getSourceConfigs,
  toggleSource,
  updateSchedule,
  runSourceNow,
} from "../api/sourceConfigApi";


function AdminSourceConfigPage() {

  console.log(
    "SOURCE CONFIG PAGE LOADED"
  );

    

  const [configs, setConfigs] =
    useState([]);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [selectedSource, setSelectedSource] =
    useState(null);

  const [editingScheduleId, setEditingScheduleId] =
    useState(null);

  const [scheduleValue, setScheduleValue] =
    useState("");

  const fetchConfigs =
    async () => {

      const response =
        await getSourceConfigs();

      setConfigs(
        response.data.data
      );
    };


  useEffect(() => {

    fetchConfigs();

  }, []);

  const handleToggle =
    async (id) => {

        await toggleSource(id);

        await fetchConfigs();
    };

  const confirmToggle = async () => {
    if (!selectedSource) return;

    await handleToggle(selectedSource._id);

    setShowConfirm(false);
    setSelectedSource(null);
  };


  const saveSchedule =
      async (id) => {

        try {

          await updateSchedule(
            id,
            scheduleValue
          );

          setEditingScheduleId(null);
          setScheduleValue("");

          await fetchConfigs();

        } catch (error) {

          alert(
            error?.response?.data?.message ||
            error.message ||
            "Invalid schedule"
          );
        }
    };


  const handleRunNow =
    async (id) => {

      await runSourceNow(id);

      await fetchConfigs();
  };


  return (
  <div className="p-6">

    <h1 className="text-4xl font-bold mb-8">
      Source Configuration
    </h1>

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
              Schedule
            </th>

            <th className="text-left p-4">
              Last Run
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {configs.map((item) => (

            <tr
              key={item._id}
              className="border-t"
            >

              <td className="p-4">
                {item.source}
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.enabled
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.enabled
                    ? "Enabled"
                    : "Disabled"}
                </span>

              </td>

              

              <td className="p-4">

                {editingScheduleId === item._id ? (

                  <div className="flex gap-2">

                    <input
                      type="text"
                      value={scheduleValue}
                      onChange={(e) =>
                        setScheduleValue(e.target.value)
                      }
                      className="border rounded px-2 py-1 w-40"
                    />

                    <button
                      onClick={() =>
                        saveSchedule(item._id)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditingScheduleId(null);
                        setScheduleValue("");
                      }}
                      className="border px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

                  </div>

                ) : (

                  <div className="flex items-center gap-2">

                    <span>
                      {item.schedule}
                    </span>

                    <button
                      onClick={() => {
                        setEditingScheduleId(item._id);
                        setScheduleValue(item.schedule);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                  </div>

                )}

              </td>
              
              <td className="p-4">
                {item.lastRunAt
                  ? new Date(
                      item.lastRunAt
                    ).toLocaleString()
                  : "-"
                }
              </td>

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.lastStatus === "SUCCESS"
                      ? "bg-green-100 text-green-800"
                      : item.lastStatus === "FAILED"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.lastStatus || "PENDING"}
                </span>

              </td>
              
     
              <td className="p-4">

                {showConfirm &&
                selectedSource?._id === item._id ? (

                  <div className="flex flex-col gap-2">

                    <p className="text-sm text-gray-600">
                      Are you sure?
                    </p>

                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setShowConfirm(false);
                          setSelectedSource(null);
                        }}
                        className="px-3 py-2 border rounded"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={confirmToggle}
                        className="px-3 py-2 bg-blue-600 text-white rounded"
                      >
                        Confirm
                      </button>

                    </div>

                  </div>

                ) : (

                  <div className="flex gap-2">

                    <button
                      onClick={() => {
                        setSelectedSource(item);
                        setShowConfirm(true);
                      }}
                      className={`px-4 py-2 rounded text-white ${
                        item.enabled
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {item.enabled
                        ? "Disable"
                        : "Enable"}
                    </button>

                    <button
                      onClick={() =>
                        handleRunNow(item._id)
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Run Now
                    </button>

                  </div>

                )}

              </td>


   

            </tr>

          ))}

        </tbody>

      </table>

    </div>


  </div>
);
}
  

export default AdminSourceConfigPage;