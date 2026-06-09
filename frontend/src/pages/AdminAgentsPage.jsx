import {
  useEffect,
  useState,
} from "react";

import {
  getAgents,
  createAgent,
  updateAgent,
  deactivateAgent,
} from "../api/agentApi";

import {
  getAgencies,
} from "../api/agencyApi";

import {
  getSchemes
} from "../api/schemeApi";

function AdminAgentsPage() {

  const [agents, setAgents] =
    useState([]);

  const [agencies, setAgencies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      mobile: "",
      email: "",
      district: "",
      state: "",
      agency_id: "",
      assigned_schemes: [],
    });

  const [selectedAgent,
    setSelectedAgent] =
    useState(null);

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  const [schemes, setSchemes] =
    useState([]);

  const [schemeSearch,
    setSchemeSearch] =
    useState("");

  useEffect(() => {
    fetchAgents();
    fetchAgencies();
    fetchSchemes();
  }, []);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const fetchAgents = async () => {
    try {

      const response =
        await getAgents();

      setAgents(
        response.data || []
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };
  const fetchAgencies =
    async () => {

      try {

        const response =
          await getAgencies();

        setAgencies(
          response.data || []
        );

      } catch (error) {

        console.error(error);
      }
  };
  const handleCreateAgent =
    async () => {

      try {

        await createAgent(
          formData
        );

        setShowCreateModal(
          false
        );

        setFormData({
          name: "",
          mobile: "",
          email: "",
          district: "",
          state: "",
          agency_id: "",
          assigned_schemes: [],
        });

        await fetchAgents();
        setSchemeSearch("");


      } catch (error) {

        console.error(error);

        alert(
          "Failed to create agent"
        );
      }
    };

  const fetchSchemes =
    async () => {

      try {

        const response =
          await getSchemes();

        setSchemes(
          response.data || []
        );

        console.log(
          "SCHEMES:",
          response.data
        );

      } catch (error) {

        console.error(error);
      }
    };

  const handleDeactivateAgent =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to deactivate this agent?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deactivateAgent(id);

        await fetchAgents();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to deactivate agent"
        );
      }
    };

  const handleUpdateAgent =
    async () => {

      try {

        await updateAgent(
          selectedAgent._id,
          formData
        );

        setShowEditModal(
          false
        );

        setSelectedAgent(
          null
        );

        await fetchAgents();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to update agent"
        );
      }
    };

  if (loading) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  const openCreateModal = () => {

    setFormData({
      name: "",
      mobile: "",
      email: "",
      district: "",
      state: "",
      agency_id: "",
      assigned_schemes: [],
  });

    setSchemeSearch("");

    setShowCreateModal(true);
  };


  const totalAgents =
    agents.length;

  const activeAgents =
    agents.filter(
      (agent) => agent.active
    ).length;

  const inactiveAgents =
    agents.filter(
      (agent) => !agent.active
    ).length;


  const filteredAgents =
    agents.filter((agent) => {

      const search =
        searchTerm.toLowerCase();

      return (
        agent.name
          ?.toLowerCase()
          .includes(search) ||

        agent.agent_code
          ?.toLowerCase()
          .includes(search) ||

        agent.mobile
          ?.toLowerCase()
          .includes(search) ||

        agent.district
          ?.toLowerCase()
          .includes(search)
      );

    });

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Agents
        </h1>

        <button
          onClick={openCreateModal}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Create Agent
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">
            Total Agents
          </p>
          <h2 className="text-2xl font-bold">
            {totalAgents}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">
            Active Agents
          </p>
          <h2 className="text-2xl font-bold text-green-600">
            {activeAgents}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-sm text-gray-500">
            Inactive Agents
          </p>
          <h2 className="text-2xl font-bold text-red-600">
            {inactiveAgents}
          </h2>
        </div>

      </div>


      <div className="mb-4">

        <input
          type="text"
          placeholder="Search by Name, Agent Code, Mobile or District..."
          className="
            w-full
            md:w-96
            border
            p-2
            rounded-lg
          "
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

      </div>

      
        <table className="w-full min-w-[1200px]">

          <thead>

            <tr className="border-b">

              <th className="p-4 text-left">
                Agent Code
              </th>

              <th className="p-4 text-left">
                Name
              </th>


              <th className="p-4 text-left">
                Agency
              </th>

              <th>Schemes</th>

              <th className="p-4 text-left">
                Mobile
              </th>

              <th className="p-4 text-left">
                District
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredAgents.map(
              (agent) => (

                <tr
                  key={agent._id}
                  className="border-b"
                >
                  <td className="p-4">

                    <span
                      className="
                        bg-blue-100
                        text-blue-700
                        px-2
                        py-1
                        rounded-lg
                        text-xs
                        font-semibold
                      "
                    >
                      {agent.agent_code}
                    </span>

                  </td>

                  <td className="p-4">
                    {agent.name}
                  </td>

                  <td className="p-4 min-w-[200px]">
                    {agent.agency_id?.name || "-"}
                  </td>

                  <td className="p-4">

                      <div className="flex flex-wrap gap-1">

                        {agent.assigned_schemes
                          ?.slice(0, 2)
                          .map((scheme) => (

                            <span
                              key={scheme._id}
                              className="
                                bg-slate-100
                                text-slate-700
                                px-2
                                py-1
                                rounded
                                text-xs
                              "
                            >
                              {scheme.title}
                            </span>

                          ))}

                        {agent.assigned_schemes
                          ?.length > 2 && (

                          <span
                            className="
                              text-xs
                              text-slate-500
                            "
                          >
                            +{
                              agent.assigned_schemes.length - 2
                            } more
                          </span>

                        )}

                      </div>

                    </td>

                  <td className="p-4">
                    {agent.mobile}
                  </td>

                  <td className="p-4">
                    {agent.district}
                  </td>

                  <td className="p-4">

                    {agent.active ? (

                      <span
                        className="
                          bg-green-100
                          text-green-700
                          px-3
                          py-1
                          rounded-full
                          text-xs
                        "
                      >
                        
                        🟢 ACTIVE
                      </span>

                    ) : (

                      <span
                        className="
                          bg-red-100
                          text-red-700
                          px-3
                          py-1
                          rounded-full
                          text-xs
                        "
                      >
                     
                        🔴 INACTIVE
                      </span>

                    )}

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => {

                          setSelectedAgent(
                            agent
                          );

                          setFormData({
                            name:
                              agent.name || "",

                            mobile:
                              agent.mobile || "",

                            email:
                              agent.email || "",

        

                            district:
                              agent.district || "",

                            state:
                              agent.state || "",

                            agency_id:
                              agent.agency_id?._id || "",
                          });

                          setShowEditModal(
                            true
                          );
                        }}
                        className="
                          bg-yellow-500
                          text-white
                          px-3
                          py-1
                          rounded
                          text-sm
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDeactivateAgent(
                            agent._id
                          )
                        }
                        className="
                          bg-red-600
                          text-white
                          px-3
                          py-1
                          rounded
                          text-sm
                        "
                      >
                        Deactivate
                      </button>

                    </div>

                  </td>




                </tr>

              )
            )}

          </tbody>

      

   

        </table>

      </div>

      {showCreateModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[500px]">

            <h2 className="text-xl font-bold mb-4">
              Create Agent
            </h2>

            <input
              placeholder="Agent Name"
              className="w-full border p-2 mb-3 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <select
              className="w-full border p-2 mb-3 rounded"
              value={formData.agency_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  agency_id: e.target.value,
                })
              }
            >
              <option value="">
                Select Agency
              </option>

              {agencies.map((agency) => (
                <option
                  key={agency._id}
                  value={agency._id}
                >
                  {agency.agency_code} - {agency.name}
                </option>
              ))}
            </select>



            <input
              placeholder="Mobile"
              className="w-full border p-2 mb-3 rounded"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobile:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
            />

   

          <div className="mb-3">

            <h3
              className="
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Assigned Schemes
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">

              {formData.assigned_schemes.map(
                (schemeId) => {

                  const scheme =
                    schemes.find(
                      (s) =>
                        s._id === schemeId
                    );

                  if (!scheme)
                    return null;

                  return (
                 
                    <span
                      key={schemeId}
                      className="
                        bg-blue-100
                        text-blue-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        cursor-pointer
                      "
                      onClick={() =>
                        setFormData({
                          ...formData,
                          assigned_schemes:
                            formData.assigned_schemes.filter(
                              (id) => id !== schemeId
                            ),
                        })
                      }
                    >
                      {scheme.title} ✕
                    </span>
              
                  );
                }
              )}

            </div>

            <input
              type="text"
              placeholder="Search Schemes..."
              className="
                w-full
                border
                p-2
                rounded
                mb-2
              "
              value={schemeSearch}
              onChange={(e) =>
                setSchemeSearch(
                  e.target.value
                )
              }
            />

            <div
              className="
                border
                rounded
                max-h-48
                overflow-y-auto
                p-2
              "
            >

              {schemes
                .filter((scheme) =>
                  !formData.assigned_schemes.includes(
                    scheme._id
                  )
                )
                .filter((scheme) =>
                  scheme.title
                    ?.toLowerCase()
                    .includes(
                      schemeSearch.toLowerCase()
                    )
                )

              
                .map((scheme) => (

                  <label
                    key={scheme._id}
                    className="
                      flex
                      items-center
                      gap-2
                      py-1
                    "
                  >

                    <input
                      type="checkbox"
                      checked={
                        formData.assigned_schemes.includes(
                          scheme._id
                        )
                      }
                      onChange={(e) => {

                        if (e.target.checked) {

                          setFormData({
                            ...formData,
                            assigned_schemes: [
                              ...formData.assigned_schemes,
                              scheme._id,
                            ],
                          });

                        } else {

                          setFormData({
                            ...formData,
                            assigned_schemes:
                              formData.assigned_schemes.filter(
                                (id) =>
                                  id !== scheme._id
                              ),
                          });

                        }

                      }}
                    />

                    {scheme.title}

                  </label>

                ))}

            </div>

          </div>

            <input
              placeholder="District"
              className="w-full border p-2 mb-3 rounded"
              value={formData.district}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  district:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="State"
              className="w-full border p-2 mb-4 rounded"
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state:
                    e.target.value,
                })
              }
            />

          

            <div className="flex justify-end gap-2">

              <button
                onClick={() =>
                  setShowCreateModal(
                    false
                  )
                }
                className="
                  px-4
                  py-2
                  border
                  rounded
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleCreateAgent
                }
                className="
                  px-4
                  py-2
                  bg-blue-600
                  text-white
                  rounded
                "
              >
                Create
              </button>

            </div>

          </div>

        </div>

      )}

      {showEditModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[500px]">

            <h2 className="text-xl font-bold mb-4">
              Edit Agent
            </h2>

            <input
              placeholder="Agent Name"
              className="w-full border p-2 mb-3 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <select
              className="w-full border p-2 mb-3 rounded"
              value={formData.agency_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  agency_id: e.target.value,
                })
              }
            >
              <option value="">
                Select Agency
              </option>

              {agencies.map((agency) => (
                <option
                  key={agency._id}
                  value={agency._id}
                >
                  {agency.agency_code} - {agency.name}
                </option>
              ))}
            </select>


            <input
              placeholder="Mobile"
              className="w-full border p-2 mb-3 rounded"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobile:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="Email"
              className="w-full border p-2 mb-3 rounded"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email:
                    e.target.value,
                })
              }
            />


    


            <input
              placeholder="District"
              className="w-full border p-2 mb-3 rounded"
              value={formData.district}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  district:
                    e.target.value,
                })
              }
            />

            <input
              placeholder="State"
              className="w-full border p-2 mb-4 rounded"
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state:
                    e.target.value,
                })
              }
            />



            <div className="flex justify-end gap-2">

              <button
                onClick={() =>
                  setShowEditModal(
                    false
                  )
                }
                className="
                  px-4
                  py-2
                  border
                  rounded
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  handleUpdateAgent
                }
                className="
                  px-4
                  py-2
                  bg-green-600
                  text-white
                  rounded
                "
              >
                Update
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminAgentsPage;