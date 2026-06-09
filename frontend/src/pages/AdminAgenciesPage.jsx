import {
  useEffect,
  useState,
} from "react";

import {
  getAgencies,
  createAgency,
  updateAgency,
  deactivateAgency,
} from "../api/agencyApi";

function AdminAgenciesPage() {

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
      contact_person: "",
      mobile: "",
      email: "",
      district: "",
      state: "",
    });

  const [selectedAgency,
    setSelectedAgency] =
    useState(null);

  const [showEditModal,
    setShowEditModal] =
    useState(false);

  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {

      const response =
        await getAgencies();

      setAgencies(
        response.data || []
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);
    }
  };

  const handleCreateAgency =
    async () => {

      try {

        await createAgency(
          formData
        );

        setShowCreateModal(
          false
        );

        setFormData({
          name: "",
          contact_person: "",
          mobile: "",
          email: "",
          district: "",
          state: "",
        });

        await fetchAgencies();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to create agency"
        );
      }
    };

  const handleDeactivateAgency =
    async (id) => {

      const confirmed =
        window.confirm(
          "Are you sure you want to deactivate this agency?"
        );

      if (!confirmed) {
        return;
      }

      try {

        await deactivateAgency(id);

        await fetchAgencies();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to deactivate agency"
        );
      }
    };

  const handleUpdateAgency =
    async () => {

      try {

        await updateAgency(
          selectedAgency._id,
          formData
        );

        setShowEditModal(
          false
        );

        setSelectedAgency(
          null
        );

        await fetchAgencies();

      } catch (error) {

        console.error(error);

        alert(
          "Failed to update agency"
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

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Agencies
        </h1>

        <button
          onClick={() =>
            setShowCreateModal(
              true
            )
          }
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Create Agency
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-4 text-left">
                Agency Code
              </th>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Contact
              </th>

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

            {agencies.map(
              (agency) => (

                <tr
                  key={agency._id}
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
                      {agency.agency_code}
                    </span>

                  </td>

                  <td className="p-4">
                    {agency.name}
                  </td>

                  <td className="p-4">
                    {agency.contact_person}
                  </td>

                  <td className="p-4">
                    {agency.mobile}
                  </td>

                  <td className="p-4">
                    {agency.district}
                  </td>

                  <td className="p-4">

                    {agency.active ? (

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

                          setSelectedAgency(
                            agency
                          );

                          setFormData({
                            name:
                              agency.name || "",

                            contact_person:
                              agency.contact_person || "",

                            mobile:
                              agency.mobile || "",

                            email:
                              agency.email || "",

                            district:
                              agency.district || "",

                            state:
                              agency.state || "",
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
                          handleDeactivateAgency(
                            agency._id
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
              Create Agency
            </h2>

            <input
              placeholder="Agency Name"
              className="w-full border p-2 mb-3 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Contact Person"
              className="w-full border p-2 mb-3 rounded"
              value={
                formData.contact_person
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_person:
                    e.target.value,
                })
              }
            />

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
                  handleCreateAgency
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
              Edit Agency
            </h2>

            <input
              placeholder="Agency Name"
              className="w-full border p-2 mb-3 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <input
              placeholder="Contact Person"
              className="w-full border p-2 mb-3 rounded"
              value={formData.contact_person}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact_person:
                    e.target.value,
                })
              }
            />

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
                  handleUpdateAgency
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

export default AdminAgenciesPage;