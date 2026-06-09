import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";


const AgentDashboardPage =
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

          const res =
            await api.get(

              "/api/applications/agent/my-applications"
            );

          setApplications(
            res.data.data || []
          );

        } catch (err) {

          console.error(err);
        }
      };


    return (

      <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">

          Agent Dashboard

        </h1>


        <div className="grid gap-4">

          {applications.map(
            (app) => (

              <div

                key={app._id}

                className="bg-white rounded-xl shadow p-4"
              >

                <h2 className="font-semibold">

                  {
                    app.scheme_id
                      ?.title
                  }

                </h2>

                <p>

                  Citizen:

                  {

                    app.user_id
                      ?.name
                  }

                </p>

                <p>

                  Status:

                  {app.status}

                </p>

              </div>
            )
          )}
        </div>
      </div>
    );
  };

export default AgentDashboardPage;