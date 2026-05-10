import {
  useEffect,
  useState
} from "react";

import api from "../api/api";

function EligibleSchemesPage() {

  const [schemes, setSchemes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [applyingId,
    setApplyingId] =
      useState(null);

  useEffect(() => {

    fetchEligibleSchemes();

  }, []);

  // ✅ Fetch eligible schemes
  const fetchEligibleSchemes =
    async () => {

      try {

        const response =
          await api.get(
            "/schemes/eligible"
          );

        setSchemes(
          response.data.data
        );

      } catch (err) {

        console.log(err);

        alert(
          "Failed to load eligible schemes"
        );

      } finally {

        setLoading(false);
      }
    };

  // ✅ Apply for scheme
  const applyForScheme =
    async (schemeId) => {

      try {

        setApplyingId(
          schemeId
        );

        const response =
          await api.post(
            `/applications/apply/${schemeId}`
          );

        alert(
          response.data.message
        );

      } catch (err) {

        console.log(err);

        alert(
          err.response?.data?.message ||

          "Failed to apply"
        );

      } finally {

        setApplyingId(null);
      }
    };

  if (loading) {

    return <h2>Loading...</h2>;
  }

  return (

    <div>

      <h2>
        Eligible Schemes
      </h2>

      {
        schemes.length === 0 ? (

          <p>
            No eligible schemes found
          </p>

        ) : (

          schemes.map((scheme) => (

            <div
              key={scheme._id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.1)"
              }}
            >

              <h3>
                {scheme.title}
              </h3>

              <p>
                <strong>
                  Department:
                </strong>

                {" "}

                {scheme.department}
              </p>

              <p>
                {scheme.description}
              </p>

              <p>
                <strong>
                  Benefits:
                </strong>

                {" "}

                {scheme.benefits}
              </p>

              <button
                onClick={() =>
                  applyForScheme(
                    scheme._id
                  )
                }

                disabled={
                  applyingId ===
                  scheme._id
                }

                style={{
                  background:
                    "#2563eb",

                  color: "white",

                  border: "none",

                  padding:
                    "10px 15px",

                  borderRadius:
                    "5px",

                  cursor: "pointer"
                }}
              >

                {
                  applyingId ===
                  scheme._id

                    ? "Applying..."

                    : "Apply Now"
                }

              </button>

            </div>
          ))
        )
      }

    </div>
  );
}

export default
EligibleSchemesPage;