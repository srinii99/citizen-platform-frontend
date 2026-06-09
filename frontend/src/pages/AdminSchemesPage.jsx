import {
  useEffect,
  useState,
} from "react";

import {

  getAdminSchemes,

  createScheme,

  deleteScheme,

  updateScheme,

} from "../api/adminSchemeApi";

function AdminSchemesPage() {

  console.log("ADMIN SCHEMES PAGE LOADED");

  const [schemes,
    setSchemes] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  const [searchTerm, 
    setSearchTerm] =
      useState("");

  const [currentPage,
    setCurrentPage] =
      useState(1);

  const [pagination,
    setPagination] =
      useState(null);

  const schemesPerPage =
    20;

  const [editingScheme,
    setEditingScheme] =
      useState(null);

  const [form,
    setForm] =
      useState({

        title: "",
        description: "",

        department: "",

        benefits: "",

        application_fee: 0,

        status: "ACTIVE",

        eligibility: {

          min_age: 18,

          max_age: 60,

          max_income: 500000,

          gender: "ANY",

          caste: "ANY",

          occupation: "ANY",

          state: "ANY",
        },
      });

  // -------------------------
  // FETCH SCHEMES
  // -------------------------

  useEffect(() => {

    fetchSchemes();

  }, [currentPage]);

  const fetchSchemes =
    async () => {

      try {

        const response =
          await getAdminSchemes(
            currentPage,
            20,
            searchTerm
          );

        console.log("SCHEMES RESPONSE : ");
        console.log(response);

        setPagination(
          response.pagination
        );


        setSchemes(
          Array.isArray(response.data)
            ? response.data
            : []
        );
        console.log("SCHEMES LENGTH:");
        console.log(response.data.length);
        console.log("IS ARRAY : ", Array.isArray(response.data));

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  // -------------------------
  // RESET FORM
  // -------------------------

  const resetForm =
    () => {

      setEditingScheme(
        null
      );

      setForm({

        title: "",
        description: "",

        department: "",

        benefits: "",

        application_fee: 0,

        status: "ACTIVE",

        eligibility: {

          min_age: 18,

          max_age: 60,

          max_income: 500000,

          gender: "ANY",

          caste: "ANY",

          occupation: "ANY",

          state: "ANY",
        },
      });
    };

  // -------------------------
  // CREATE SCHEME
  // -------------------------

  const handleCreate =
    async (e) => {

      e.preventDefault();

      try {

        await createScheme(
          form
        );

        alert(
          "Scheme created"
        );

        fetchSchemes();

        resetForm();

      } catch (err) {

        console.log(err);

        alert(
          "Failed to create scheme"
        );
      }
    };

  // -------------------------
  // UPDATE SCHEME
  // -------------------------

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      try {

      
        const payload = {

          ...form,

          eligibilityRules:
            form.eligibility,
        };

        delete payload.eligibility;

        console.log(
          "UPDATE PAYLOAD"
        );

        console.log(payload);

        await updateScheme(

          editingScheme._id,

          payload
        );


        alert(
          "Scheme updated"
        );

        fetchSchemes();

        resetForm();

      } catch (err) {

        console.log("UPDATE ERROR");

        console.log(err);
        console.log(err.response?.data);

        alert(
          "Update failed"
        );
      }
    };

  // -------------------------
  // DELETE SCHEME
  // -------------------------

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete scheme?"
        );

      if (!confirmed)
        return;

      try {

        await deleteScheme(
          id
        );

        fetchSchemes();

      } catch (err) {

        console.log(err);
      }
    };



  // -------------------------
  // LOADING
  // -------------------------

  if (loading) {

    return (

      <div className="p-6">

        Loading schemes...

      </div>
    );
  }

  
  const filteredSchemes =
    schemes.filter((scheme) =>

      scheme.title
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );


  const totalPages =
    pagination?.totalPages || 1;

 


 



  // -------------------------
  // UI
  // -------------------------

  return (

    <div className="p-6">

      <h1 className="text-4xl font-bold text-gray-800 mb-8">

        Scheme Management

      </h1>

    <div className="mb-6">

      <input
        type="text"
        placeholder="Search schemes..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(
            e.target.value
          );
          
        }}
     
        className="w-full md:w-96 border rounded-lg px-4 py-3"
      />

    </div>

      {/* FORM */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">

          {
            editingScheme
              ? "Update Scheme"
              : "Create Scheme"
          }

        </h2>

        <form
          onSubmit={
            editingScheme
              ? handleUpdate
              : handleCreate
          }
          className="grid md:grid-cols-2 gap-4"
        >

          {/* TITLE */}

          <input
            type="text"

            placeholder="Scheme Title"

            value={form.title}

            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-3 md:col-span-2"
          />

          {/* DEPARTMENT */}

          <input
            type="text"

            placeholder="Department"

            value={
              form.department
            }

            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* BENEFITS */}

          <input
            type="text"

            placeholder="Benefits"

            value={
              form.benefits
            }

            onChange={(e) =>
              setForm({
                ...form,
                benefits:
                  e.target.value,
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* APPLICATION FEE */}

          <input
            type="number"

            placeholder="Application Fee"

            value={
              form.application_fee
            }

            onChange={(e) =>
              setForm({
                ...form,
                application_fee:
                  e.target.value,
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* ELIGIBILITY TITLE */}

          <div className="md:col-span-2">

            <h3 className="text-xl font-bold mt-4 mb-4">

              Eligibility Rules

            </h3>

          </div>

          {/* MIN AGE */}

          <input
            type="number"

            placeholder="Min Age"

            value={
              form.eligibility.min_age
            }

            onChange={(e) =>
              setForm({

                ...form,

                eligibility: {

                  ...form.eligibility,

                  min_age:
                    e.target.value,
                },
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* MAX AGE */}

          <input
            type="number"

            placeholder="Max Age"

            value={
              form.eligibility.max_age
            }

            onChange={(e) =>
              setForm({

                ...form,

                eligibility: {

                  ...form.eligibility,

                  max_age:
                    e.target.value,
                },
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* MAX INCOME */}

          <input
            type="number"

            placeholder="Max Income"

            value={
              form.eligibility.max_income
            }

            onChange={(e) =>
              setForm({

                ...form,

                eligibility: {

                  ...form.eligibility,

                  max_income:
                    e.target.value,
                },
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* GENDER */}

          <input
            type="text"

            placeholder="Gender"

            value={
              form.eligibility.gender
            }

            onChange={(e) =>
              setForm({

                ...form,

                eligibility: {

                  ...form.eligibility,

                  gender:
                    e.target.value,
                },
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* CASTE */}

          <input
            type="text"

            placeholder="Caste"

            value={
              form.eligibility.caste
            }

            onChange={(e) =>
              setForm({

                ...form,

                eligibility: {

                  ...form.eligibility,

                  caste:
                    e.target.value,
                },
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* OCCUPATION */}

          <input
            type="text"

            placeholder="Occupation"

            value={
              form.eligibility.occupation
            }

            onChange={(e) =>
              setForm({

                ...form,

                eligibility: {

                  ...form.eligibility,

                  occupation:
                    e.target.value,
                },
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* STATE */}

          <input
            type="text"

            placeholder="State"

            value={
              form.eligibility.state
            }

            onChange={(e) =>
              setForm({

                ...form,

                eligibility: {

                  ...form.eligibility,

                  state:
                    e.target.value,
                },
              })
            }

            className="border rounded-lg px-4 py-3"
          />

          {/* BUTTONS */}

          <div className="flex gap-4 md:col-span-2">

            <button
              type="submit"

              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
            >

              {
                editingScheme
                  ? "Update Scheme"
                  : "Create Scheme"
              }

            </button>

            {
              editingScheme && (

                <button
                  type="button"

                  onClick={
                    resetForm
                  }

                  className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg"
                >

                  Cancel

                </button>
              )
            }

          </div>

        </form>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Title
              </th>

              <th className="text-left p-4">
                Department
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Actions
              </th>


            </tr>

          </thead>

      
          <tbody>

            
            {filteredSchemes.map((scheme) => (

             
              <tr
                key={scheme._id}
                className="border-t"
              >

                <td className="p-4">
                  {scheme.title}
                </td>

                <td className="p-4">
                  {scheme.department}
                </td>

                {/* STATUS */}

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      scheme.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {scheme.status}
                  </span>

                </td>

                {/* ACTIONS */}

                <td className="p-4 flex gap-2">

                  {/* EDIT */}

                  <button
                    onClick={() => {

                      setEditingScheme(
                        scheme
                      );

                      setForm({

                        title:
                          scheme.title || "",

                        description:
                          scheme.description || "",

                        department:
                          scheme.department || "",

                        benefits:
                          scheme.benefits || "",

                        application_fee:
                          scheme.application_fee || 0,

                        status:
                          scheme.status || "ACTIVE",

                        eligibility: {

                          min_age:
                            scheme.eligibilityRules?.min_age ?? 18,

                          max_age:
                            scheme.eligibilityRules?.max_age ?? 60,

                          max_income:
                            scheme.eligibilityRules?.max_income ?? 500000,

                          gender:
                            scheme.eligibilityRules?.gender ?? "ANY",

                          caste:
                            scheme.eligibilityRules?.caste ?? "ANY",

                          occupation:
                            scheme.eligibilityRules?.occupation ?? "ANY",

                          state:
                            scheme.eligibilityRules?.state ?? "ANY",
                        },
                      });

                    }}

                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>

                  {/* ACTIVATE / DEACTIVATE */}

                  <button
                    onClick={async () => {

              

                      try {

                        await updateScheme(

                          scheme._id,

                          {

                            status:
                              scheme.status === "ACTIVE"
                                ? "INACTIVE"
                                : "ACTIVE",
                          }
                        );

                        fetchSchemes();

                      } catch (err) {

                        console.log(err);
                      }
                    }}

                    className={`px-4 py-2 rounded text-white ${
                      scheme.status === "ACTIVE"
                        ? "bg-yellow-500"
                        : "bg-green-600"
                    }`}
                  >

                    {
                      scheme.status === "ACTIVE"
                        ? "Deactivate"
                        : "Activate"
                    }

                
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      handleDelete(
                        scheme._id
                      )
                    }

                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

               

                </td>


              </tr>
                

            ))}

          </tbody>

          


                    

        </table>

      </div>

      <div className="flex justify-center items-center gap-4 mt-6">

        <button

          disabled={
            currentPage === 1
          }

          onClick={() =>
            setCurrentPage(
              currentPage - 1
            )
          }

          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >

          Previous

        </button>

        <span>

          Page {currentPage}
          {" "}
          of
          {" "}
          {totalPages}

        </span>

        <button

          disabled={
            currentPage === totalPages
          }

          onClick={() =>
            setCurrentPage(
              currentPage + 1
            )
          }

          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >

          Next

        </button>

      </div>

    </div>
  );
}

export default AdminSchemesPage;