import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getSchemeById,
} from "../api/schemeApi";


import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { applyForScheme } from "../api/applicationApi";

const SchemeDetailsPage = () => {

  const { id } =
    useParams();
  const navigate = useNavigate();

  const [scheme, setScheme] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadScheme();

  }, []);

  
  const handleApply = async () => {

    try {

      const res =
        await applyForScheme(id);

      toast.success(
        "Application created successfully"
      );

      navigate(
        "/my-applications"
      );

      } catch (err) {

        console.error(err);

        toast.error(
          "Failed to create application"
        );
      }
    };

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

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">

        {/* HEADER */}

        <div className="border-b pb-6">

          <h1 className="text-4xl font-bold text-gray-800">

            {scheme.title}

          </h1>

          <p className="text-blue-600 mt-2 text-lg">

            {scheme.department}

          </p>

        </div>


        {/* DESCRIPTION */}

        <div className="mt-8">

          <h2 className="text-2xl font-semibold mb-4">

            Scheme Description

          </h2>

          <p className="text-gray-700 leading-relaxed">

            {scheme.description}

          </p>

        </div>


        {/* BENEFITS */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">

            Benefits

          </h2>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">

            <p className="text-green-700 text-lg font-medium">

              {scheme.benefits ||
                "Benefits information will be updated soon."}

            </p>

          </div>

        </div>


        {/* ELIGIBILITY */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">

            Eligibility Criteria

          </h2>

          <div className="space-y-4">

            {scheme.eligibility_rules?.map(
              (rule, index) => (

                <div
                  key={index}
                  className="
                    border
                    border-slate-200
                    rounded-xl
                    p-4
                    bg-slate-50
                  "
                >

                  <p className="text-slate-700">

                    <span className="font-semibold">

                      {rule.field}

                    </span>

                    {" "}

                    {rule.operator}

                    {" "}

                    <span className="font-semibold">

                      {rule.value}

                    </span>

                  </p>

                </div>
              )
            )}

          </div>

        </div>


        {/* REQUIRED DOCUMENTS */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">

            Required Documents

          </h2>

          <div className="space-y-3">

            {scheme.documents_required?.length > 0 ? (

              scheme.documents_required.map(
                (doc, index) => (

                  <div
                    key={index}
                    className="
                      border
                      border-slate-200
                      rounded-xl
                      p-4
                    "
                  >

                    {doc}

                  </div>
                )
              )

            ) : (

              <p className="text-slate-500">

                Documents will be updated soon.

              </p>
            )}

          </div>

        </div>


        {/* APPLICATION FEE */}

        <div className="mt-10">

          <h2 className="text-2xl font-semibold mb-4">

            Application Fee

          </h2>

          <p className="text-gray-700 text-lg">

            ₹{scheme.application_fee || 0}

          </p>

        </div>

      </div>

        <div className="mt-10 flex justify-end">

          <button
            onClick={handleApply}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-xl
              font-medium
            "
          >
            Apply For Scheme
          </button>

        </div>

    </div>
  );
};

export default SchemeDetailsPage;