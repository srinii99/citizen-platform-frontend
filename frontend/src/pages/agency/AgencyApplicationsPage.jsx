import {
  useEffect,
  useState,
} from "react";


import api from "../../api/axios";

const AgencyApplicationsPage =
  () => {

    const [
      applications,
      setApplications,
    ] = useState([]);

    const [
        agents,
        setAgents,
        ] = useState([]);

        const [
        selectedApplication,
        setSelectedApplication,
        ] = useState(null);

        const [
        selectedAgent,
        setSelectedAgent,
        ] = useState("");

    useEffect(() => {

      loadApplications();
      loadAgents();

    }, []);

    const loadApplications =
      async () => {

        try {

          const agencyId =
            "6a1ecce7748e75b7e9bf1a3d";

          const res =
            await api.get(
              `/agencies/${agencyId}/applications`
            );

          setApplications(
            res.data.data || []
          );

        } catch (err) {

          console.error(err);
        }
      };

    const loadAgents =
        async () => {

            try {

            const agencyId =
                "6a1ecce7748e75b7e9bf1a3d";

            const res =
                await api.get(
                `/agencies/${agencyId}/agents`
                );

            console.log(
                "AGENTS",
                res.data
            );

            setAgents(
                res.data.data || []
            );

            } catch (err) {

            console.error(err);
            }
        };
    const assignAgent =
        async () => {

            try {

            await api.post(
                "/agencies/assign-agent",
                {
                applicationId:
                    selectedApplication._id,

                agentId:
                    selectedAgent,
                }
            );

            alert(
                "Agent assigned successfully"
            );

            setSelectedApplication(
                null
            );

            setSelectedAgent("");

            loadApplications();

            } catch (err) {

            console.error(err);

            alert(
                "Failed to assign agent"
            );
            }
        };

    return (

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          Agency Applications
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  Citizen
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Agent
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {applications.map(
                (app) => (

                  <tr
                    key={app._id}
                    className="border-t"
                  >

                    <td className="p-3">
                      {
                        app.user_id?.name ||
                        "N/A"
                      }
                    </td>

                    <td className="p-3">
                      {app.status}
                    </td>

                    <td className="p-3">

                      {
                        app.assigned_agent_id
                          ?.name ||
                        "Not Assigned"
                      }

                    </td>

                    <td className="p-3">

                  
                    <button
                        onClick={() =>
                            setSelectedApplication(app)
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                        Assign Agent
                    </button>
                     

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {
            selectedApplication && (

                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                <div className="bg-white rounded-xl p-6 w-96">

                    <h2 className="font-bold mb-4">
                    Assign Agent
                    </h2>

                    <select
                    className="border p-2 w-full"
                    value={selectedAgent}
                    onChange={(e) =>
                        setSelectedAgent(
                        e.target.value
                        )
                    }
                    >

                    <option value="">
                        Select Agent
                    </option>

                    {agents.map(
                        (agent) => (

                        <option
                            key={agent._id}
                            value={agent._id}
                        >
                            {agent.name}
                        </option>

                        )
                    )}

                    </select>

                    <div className="flex gap-2 mt-4">

                        <button
                            onClick={assignAgent}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Assign
                        </button>

                        <button
                            onClick={() =>
                            setSelectedApplication(
                                null
                            )
                            }
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>

                        </div>

                   

                </div>

                </div>

            )
            }

      </div>
    );
  };

export default AgencyApplicationsPage;