import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  getSchemes,
} from "../api/schemeApi";

const SchemesPage = () => {

  const navigate =
    useNavigate();

  const [schemes,
    setSchemes] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);


  useEffect(() => {

    loadSchemes();

  }, []);



  const loadSchemes =
  async () => {

    try {

      const res =
        await getSchemes();

      console.log(
        "SCHEMES RESPONSE:",
        res
      );

      setSchemes(
        res.data
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
        Loading schemes...
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-gray-800">

            Schemes

          </h1>

          <p className="text-gray-500 mt-2 text-lg">

            Explore government welfare schemes available for citizens.

          </p>

        </div>


        {/* EMPTY STATE */}

        {schemes.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <h2 className="text-2xl font-semibold text-gray-700">

              No Schemes Available

            </h2>

            <p className="text-gray-500 mt-3">

              Schemes will be updated soon.

            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

            {schemes.map(
              (scheme) => (

                <div
                  key={scheme._id}
                  className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    border-slate-200
                    p-6
                    hover:shadow-md
                    transition-all
                  "
                >

                  {/* TITLE */}

                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">

                      {scheme.title}

                    </h2>

                    <p className="text-blue-600 mt-2 font-medium">

                      {scheme.department}

                    </p>

                  </div>


                  {/* DESCRIPTION */}

                  <p className="text-gray-600 mt-5 leading-relaxed">

                    {scheme.description}

                  </p>


                  {/* BENEFITS */}

                  <div className="mt-6">

                    <p className="text-sm text-slate-500">

                      Benefits

                    </p>

                    <p className="text-green-600 font-semibold mt-1">

                      {scheme.benefits}

                    </p>

                  </div>


                  {/* APPLICATION FEE */}

                  <div className="mt-5">

                    <p className="text-sm text-slate-500">

                      Application Fee

                    </p>

                    <p className="font-semibold mt-1">

                      ₹{scheme.application_fee || 0}

                    </p>

                  </div>


                  {/* REQUIRED DOCUMENTS */}

                  <div className="mt-5">

                    <p className="text-sm text-slate-500 mb-2">

                      Required Documents

                    </p>

                    <div className="flex flex-wrap gap-2">

                      {scheme.documents_required?.length > 0 ? (

                        scheme.documents_required.map(
                          (doc, index) => (

                            <span
                              key={index}
                              className="
                                bg-slate-100
                                text-slate-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                              "
                            >

                              {doc}

                            </span>
                          )
                        )

                      ) : (

                        <span className="text-slate-400 text-sm">

                          Documents not updated

                        </span>
                      )}

                    </div>

                  </div>


                 

                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default SchemesPage;