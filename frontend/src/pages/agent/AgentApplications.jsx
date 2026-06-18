import {
  useEffect,
  useState,
} from "react";

import api from "../../api/axios";

const AgentApplications =
  () => {

    const [
      applications,
      setApplications,
    ] = useState([]);

    useEffect(() => {

      loadApplications();

    }, []);


    const loadApplications =
        async () => {

            try {

            setLoading(true);

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            const agentId =
                user?.agentId;


            const res =
                await api.get(
                `/agents/${agentId}/applications`
                );

            setApplications(
                res.data.data || []
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
                Loading applications...
                </div>

            );
        }
    

    return (

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">
          My Applications
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
                  Agency
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>

         
            <tbody>

            {applications.length === 0 && (
                <tr>
                <td
                    colSpan="4"
                    className="text-center p-6"
                >
                    No applications assigned
                </td>
                </tr>
            )}

            {applications.map(
                (app) => (
                <tr key={app._id}>
                    ...
                </tr>
                )
            )}

            </tbody>




          </table>

        </div>

      </div>
    );
  };

export default AgentApplications;