import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  getProfile,
} from "../api/userApi";

import {
  getEligibleSchemes,
} from "../api/schemeApi";

import {
  getMyApplications,
} from "../api/applicationApi";


const DashboardPage = () => {

  const navigate =
    useNavigate();

  const [profile,
    setProfile] =
    useState(null);

  const [schemes,
    setSchemes] =
    useState([]);

  const [applications,
    setApplications] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);


  useEffect(() => {

    loadDashboard();

  }, []);


  const loadDashboard =
    async () => {

      try {

        const [
          profileRes,
          schemesRes,
          applicationsRes,
        ] = await Promise.all([

          getProfile(),

          getEligibleSchemes(),

          getMyApplications(),
        ]);
        console.log("PROFILE:", profileRes);
        console.log("SCHEMES:", schemesRes);
        console.log("APPLICATIONS:", applicationsRes);

        setProfile(profileRes);

        setProfile(
          profileRes
        );

        console.log(
          "SCHEMES RESPONSE:",
          schemesRes
        );

        setSchemes(
          schemesRes.data|| []
        );

        setApplications(
          applicationsRes.data || []
        );

      } catch (err) {

        console.log(err);

        toast.error(
          "Failed to load dashboard"
        );

      } finally {

        setLoading(false);
      }
    };


  const eligibleSchemes =
    schemes.filter(
      (scheme) =>
        scheme.eligible
    );

  const approvedApplications =
    applications.filter(
      (app) =>
        app.status ===
        "APPROVED"
    );


  if (loading) {

    return (

      <div className="p-6">

        Loading dashboard...

      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-800">

            Welcome,
            {" "}
            {
              profile?.name ||
              "Citizen"
            }

          </h1>

          <p className="text-gray-500 mt-2">

            Explore schemes and track your applications

          </p>

        </div>


        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {/* ELIGIBLE SCHEMES */}

          <div
            className="
              bg-white
              rounded-2xl
              shadow
              p-6
              border
            "
          >

            <h2 className="text-gray-500 text-sm">

              Eligible Schemes

            </h2>

            <p className="text-4xl font-bold text-blue-600 mt-2">

              {
                eligibleSchemes.length
              }

            </p>

          </div>


          {/* APPLICATIONS */}

          <div
            className="
              bg-white
              rounded-2xl
              shadow
              p-6
              border
            "
          >

            <h2 className="text-gray-500 text-sm">

              My Applications

            </h2>

            <p className="text-4xl font-bold text-purple-600 mt-2">

              {
                applications.length
              }

            </p>

          </div>


          {/* APPROVED */}

          <div
            className="
              bg-white
              rounded-2xl
              shadow
              p-6
              border
            "
          >

            <h2 className="text-gray-500 text-sm">

              Approved

            </h2>

            <p className="text-4xl font-bold text-green-600 mt-2">

              {
                approvedApplications.length
              }

            </p>

          </div>

        </div>


        {/* PROFILE COMPLETION */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow
            p-6
            border
            mb-10
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-gray-800">

                Profile Completion

              </h2>

              <p className="text-gray-500 mt-1">

                Keep your profile updated for better scheme matching

              </p>

            </div>

            <button
              onClick={() =>
                navigate(
                  "/complete-profile"
                )
              }

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-xl
              "
            >

              Update Profile

            </button>

          </div>

        </div>


        {/* ALL SCHEMES */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow
            p-6
            border
          "
        >

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold text-gray-800">

                All Schemes

              </h2>

              <p className="text-gray-500 mt-2">

                Government schemes based on your profile and state

              </p>

            </div>

          </div>


          {schemes.length === 0 ? (

            <div className="text-center py-10">

              <p className="text-gray-500">

                No schemes available

              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

              {
                schemes.map(
                  (scheme) => (

                    <div
                      key={scheme._id}

                      className="
                        border
                        rounded-2xl
                        p-6
                        bg-gray-50
                        hover:shadow-lg
                        transition-all
                      "
                    >

                      {/* TITLE */}

                      <div className="flex items-start justify-between">

                        <div>

                          <h3 className="text-xl font-bold text-gray-800">

                            {scheme.title}

                          </h3>

                          <p className="text-blue-600 mt-1">

                            {
                              scheme.department
                            }

                          </p>

                        </div>

                      </div>


                      {/* ELIGIBILITY BADGE */}

                      <div className="mt-4">

                        {
                          scheme.eligible ? (

                            <span
                              className="
                                inline-block
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                bg-green-100
                                text-green-700
                              "
                            >

                              Eligible

                            </span>

                          ) : (

                            <span
                              className="
                                inline-block
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                bg-red-100
                                text-red-700
                              "
                            >

                              Not Eligible

                            </span>
                          )
                        }

                      </div>


                      {/* DESCRIPTION */}

                      <p className="text-gray-600 mt-4 leading-relaxed">

                        {
                          scheme.description
                        }

                      </p>


                      {/* BENEFITS */}

                      <div className="mt-5">

                        <p className="text-sm text-gray-500">

                          Benefits

                        </p>

                        <p className="font-semibold text-green-600 mt-1">

                          {
                            scheme.benefits
                          }

                        </p>

                      </div>


                      {/* REASONS */}

                      {
                        !scheme.eligible && (

                          <div className="mt-5">

                            <p
                              className="
                                text-sm
                                font-semibold
                                text-red-600
                              "
                            >

                              Why not eligible:

                            </p>

                            <ul
                              className="
                                mt-2
                                ml-5
                                list-disc
                                text-sm
                                text-gray-600
                                space-y-1
                              "
                            >

                              {
                                scheme.reasons?.map(
                                  (
                                    reason,
                                    index
                                  ) => (

                                    <li
                                      key={index}
                                    >

                                      {reason}

                                    </li>
                                  )
                                )
                              }

                            </ul>

                          </div>
                        )
                      }


                      {/* APPLY */}

                      {
                        scheme.eligible && (

                          <button

                            onClick={() =>
                              navigate(
                                `/schemes/${scheme._id}`
                              )
                            }

                            className="
                              mt-6
                              w-full
                              bg-blue-600
                              hover:bg-blue-700
                              text-white
                              py-3
                              rounded-xl
                              font-medium
                            "
                          >

                            Apply Now

                          </button>
                        )
                      }

                    </div>
                  )
                )
              }

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default DashboardPage;