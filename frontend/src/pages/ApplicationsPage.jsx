import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  FiFileText,
} from "react-icons/fi";

import api from "../api/api";

import Loader from "../components/ui/Loader";

import ApplicationCard from "../components/applications/ApplicationCard";
import ApplicationSkeleton from "../components/applications/ApplicationSkeleton";

function ApplicationsPage() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // -------------------------
  // FETCH APPLICATIONS
  // -------------------------

  const fetchApplications =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await api.get(
            "/applications",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setApplications(
          response.data.data
        );

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);
      }
    };

  // -------------------------
  // EFFECT
  // -------------------------

  useEffect(() => {

    fetchApplications();

  }, []);

  // -------------------------
  // LOADING
  // -------------------------

  if (loading) {

    return (

      <div className="grid gap-6">

        {[1, 2, 3].map((item) => (

          <ApplicationSkeleton
            key={item}
          />

        ))}

      </div>
    );
  }

  // -------------------------
  // UI
  // -------------------------

  return (

    <div>

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >

        <h1 className="text-4xl font-bold text-slate-800">

          My Applications

        </h1>

        <p className="text-slate-500 mt-2">

          Track all your welfare scheme applications in one place.

        </p>

      </motion.div>

      {/* EMPTY STATE */}

      {
        applications.length === 0 ? (

          <div
            className="
              bg-white
              rounded-3xl
              border
              border-slate-200
              py-20
              text-center
            "
          >

            <FiFileText
              className="
                text-6xl
                text-slate-300
                mx-auto
                mb-5
              "
            />

            <h2 className="text-2xl font-semibold text-slate-700">

              No Applications Yet

            </h2>

            <p className="text-slate-500 mt-2">

              Start applying for government schemes to track them here.

            </p>

          </div>

        ) : (

          <div className="grid gap-6">

            {
              applications.map((app) => (

                <ApplicationCard
                  key={app._id}
                  application={{
                    _id: app._id,

                    status:
                      app.status
                        ?.toUpperCase()
                        ?.replace(" ", "_") || "PENDING",

                    createdAt:
                      app.created_at,

                    scheme: {
                      name:
                        app.scheme_id?.name
                    },

                    adminRemarks:
                      app.admin_remarks || "",
                  }}
                />

              ))
            }

          </div>
        )
      }

    </div>
  );
}

export default ApplicationsPage;