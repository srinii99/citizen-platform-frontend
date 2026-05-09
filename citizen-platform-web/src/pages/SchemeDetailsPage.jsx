import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getSchemeById,
} from "../api/schemeApi";

import {
  createApplication,
} from "../api/applicationApi";

const SchemeDetailsPage = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [scheme, setScheme] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadScheme();
  }, []);

  const loadScheme =
    async () => {

      try {

        const res =
          await getSchemeById(id);

        setScheme(res.data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

  const handleApply =
    async () => {

      try {

        const res =
          await createApplication(
            scheme._id
          );

        navigate(
          `/applications/${res.data._id}`
        );

      } catch (err) {

        console.error(err);

        alert(
          err.response?.data
            ?.message ||
          "Failed to create application"
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

  if (!scheme) {
    return (
      <div className="p-6">
        Scheme not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-4xl font-bold text-gray-800">
              {scheme.name}
            </h1>

            <p className="text-blue-600 mt-2">
              {scheme.category}
            </p>

          </div>

        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          {scheme.description}
        </p>

        <div className="mt-8">

          <h2 className="text-2xl font-semibold mb-4">
            Eligibility Criteria
          </h2>

          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(
              scheme.eligibility_rules,
              null,
              2
            )}
          </pre>

        </div>

        <div className="mt-8">

          <h2 className="text-2xl font-semibold mb-4">
            Benefits
          </h2>

          <p className="text-gray-700">
            {scheme.benefits ||
              "Benefits information will be updated soon."}
          </p>

        </div>

        <button
          onClick={handleApply}
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
        >
          Apply Now
        </button>

      </div>
    </div>
  );
};

export default SchemeDetailsPage;