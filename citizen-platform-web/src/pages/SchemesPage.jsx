import { useEffect, useState } from "react";

import api from "../api/api";

import { useNavigate } from "react-router-dom";

function SchemesPage() {

  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch schemes
  const fetchSchemes = async () => {

    try {

      const response = await api.get("/schemes");

      setSchemes(response.data);

    } catch (err) {

      console.log(err);
    }
  };
  const applyScheme = async (schemeId) => {

    try {

      const token =
        localStorage.getItem("token");

      await api.post(
        "/applications",
        {
          scheme_id: schemeId
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Application created");

      navigate("/applications");

    } catch (err) {

      console.log(err);

      alert("Error creating application");
    }
  };
  useEffect(() => {

    fetchSchemes();

  }, []);

  return (

    <div>

      <h1>Government Schemes</h1>

      <br />

      {
        schemes.map((scheme) => (

          <div
            key={scheme._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >

            <h2>{scheme.name}</h2>

            <p>
              <strong>State:</strong>
              {" "}
              {scheme.state}
            </p>

            <p>
              <strong>Benefits:</strong>
              {" "}
              {scheme.benefits}
            </p>

            <br />

            <button
              onClick={() =>
                applyScheme(scheme._id)
              }
            >
              Apply
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default SchemesPage;