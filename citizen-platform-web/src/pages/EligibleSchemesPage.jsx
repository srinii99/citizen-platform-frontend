import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getEligibleSchemes,
} from "../api/schemeApi";

const EligibleSchemesPage = () => {

  const navigate =
    useNavigate();

  const [schemes, setSchemes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadSchemes();
  }, []);

  const loadSchemes = async () => {

    try {

      const res =
        await getEligibleSchemes();

      setSchemes(res.data);

    } catch (err) {

      console.error(
        "Failed to fetch schemes",
        err
      );

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading Eligible Schemes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">
            Eligible Schemes
          </h1>

          <p className="text-gray-500 mt-2">
            Personalized government
            schemes recommended
            for you
          </p>

        </div>

        {schemes.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center">

            <h2 className="text-2xl font-semibold text-gray-700">
              No Eligible Schemes Found
            </h2>

            <p className="text-gray-500 mt-2">
              Update your profile to
              get better recommendations.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {schemes.map((scheme) => (

              <div
                key={scheme._id}
                className="bg-white rounded-xl shadow-md border p-6 hover:shadow-lg transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      {scheme.name}
                    </h2>

                    <p className="text-sm text-blue-600 mt-1">
                      {scheme.category}
                    </p>

                  </div>

                  <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                    ⭐ {scheme.recommendation_score}
                  </div>

                </div>

                <p className="mt-4 text-gray-600">
                  {scheme.description}
                </p>

                <div className="mt-4">

                  <h3 className="font-semibold text-gray-700 mb-2">
                    Eligibility Status
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Eligible
                    </span>

                  </div>

                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/schemes/${scheme._id}`
                    )
                  }
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                >
                  Apply Now
                </button>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibleSchemesPage;