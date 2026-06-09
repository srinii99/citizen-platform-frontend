import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiXCircle,
} from "react-icons/fi";

import {
  getAllApplications,
  updateApplicationStatus,
  getSchemeStats,
} from "../api/adminApi";

import Loader from "../components/ui/Loader";
import StatCard from "../components/ui/StatCard";

import AdminApplicationsTable
  from "../components/admin/AdminApplicationsTable";

import AdminFilters
  from "../components/admin/AdminFilters";



const AdminDashboardPage = () => {

  const [applications, setApplications] =
    useState([]);

  const [schemeStats, setSchemeStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  // -------------------------
  // LOAD APPLICATIONS
  // -------------------------

  useEffect(() => {

    loadApplications();

    loadSchemeStats();
    

  }, []);

  const loadApplications =
    async () => {

      try {


        const res =
          await getAllApplications();

        setApplications(
          res.data
        );
      

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

  const loadSchemeStats =
    async () => {

      try {

        const res =
          await getSchemeStats();

        setSchemeStats(
          res.data.data
        );

      } catch (err) {

        console.error(err);
      }
    };

  // -------------------------
  // STATUS UPDATE
  // -------------------------

  const handleStatusUpdate =
    async (
      id,
      status,
      remarks =""
    ) => {

      try {


        await updateApplicationStatus(
          id,
          status,
          remarks
        );

        toast.success(
          `Application marked as ${status}`
        );

        loadApplications();
       

      } catch (err) {

        console.log("STATUS UPDATE ERROR");
        console.log(err.response?.data);
        console.error(err);

        toast.error(
          "Failed to update status"
        );
      }
    };

  const handleRequestInfo =
    async (
      id,
      remarks
    ) => {

      await handleStatusUpdate(
        id,
        "NEEDS_MORE_INFO",
        remarks
      );
    };

  // -------------------------
  // STATS
  // -------------------------

  const pendingCount =
    applications.filter(
      (a) => a.status === "PENDING"
    ).length;

  const approvedCount =
    applications.filter(
      (a) => a.status === "APPROVED"
    ).length;

  const rejectedCount =
    applications.filter(
      (a) => a.status === "REJECTED"
    ).length;

  // -------------------------
  // FILTERED
  // -------------------------

  const filteredApplications =
    applications.filter((app) => {

      const matchesSearch =
        app.scheme_id?.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "ALL"
          ? true
          : app.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // -------------------------
  // LOADING
  // -------------------------

  if (loading) {

    return <Loader />;
  }

  // -------------------------
  // UI
  // -------------------------

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >

        <h1 className="text-4xl font-bold text-slate-800">

          Admin Dashboard

        </h1>

        <p className="text-slate-500 mt-2">

          Manage applications, documents,
          and citizen approvals.

        </p>

      </motion.div>

      {/* SCHEME ANALYTICS */}

      {schemeStats && (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          <StatCard
            title="Total Schemes"
            value={schemeStats.total}
            icon={<FiLayers />}
            color="blue"
          />

          <StatCard
            title="MyScheme"
            value={schemeStats.myScheme}
            icon={<FiCheckCircle />}
            color="green"
          />

          <StatCard
            title="APISetu"
            value={schemeStats.apiSetu}
            icon={<FiClock />}
            color="yellow"
          />

          <StatCard
            title="Manual"
            value={schemeStats.manual}
            icon={<FiXCircle />}
            color="red"
          />

        </div>

      )}

  

      {schemeStats?.categories?.length > 0 && (


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

          {/* TOP CATEGORIES */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Top Scheme Categories
            </h2>

            <div className="space-y-3">

              {schemeStats?.categories?.map(
                (category) => (

                  <div
                    key={category._id}
                    className="flex justify-between border-b pb-2"
                  >

                    <span>
                      {category._id}
                    </span>

                    <span className="font-semibold">
                      {category.count}
                    </span>

                  </div>
                )
              )}

            </div>

          </div>

          {/* RECENT IMPORTS */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              Recent Imported Schemes
            </h2>

            <div className="space-y-3">

              {schemeStats?.recentSchemes?.map(
                (scheme) => (

                  <div
                    key={scheme._id}
                    className="flex justify-between border-b pb-2"
                  >

                    <div>

                      <div className="font-medium">
                        {scheme.title}
                      </div>

                      <div className="text-sm text-gray-500">
                        {scheme.source}
                      </div>

                    </div>

                    <div className="text-sm text-gray-400">

                      {new Date(
                        scheme.createdAt
                      ).toLocaleDateString()}

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>
       )}
    



 

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Total Applications"
          value={applications.length}
          icon={<FiLayers />}
          color="blue"
        />

        <StatCard
          title="Pending"
          value={pendingCount}
          icon={<FiClock />}
          color="yellow"
        />

        <StatCard
          title="Approved"
          value={approvedCount}
          icon={<FiCheckCircle />}
          color="green"
        />

        <StatCard
          title="Rejected"
          value={rejectedCount}
          icon={<FiXCircle />}
          color="red"
        />

      </div>

      {/* FILTERS */}

      <AdminFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* TABLE */}

      <AdminApplicationsTable
        applications={filteredApplications}
        
        onStatusUpdate={
          handleStatusUpdate
        }
                
        onApprove={(
          id,
          remarks
        ) =>
          handleStatusUpdate(
            id,
            "APPROVED",
            remarks
          )
        }
        onReject={(
          id,
          remarks
        ) =>
          handleStatusUpdate(
            id,
            "REJECTED",
            remarks
          )
        }
        onRequestInfo={
          handleRequestInfo
        }
      />

    </div>
  );
};

export default AdminDashboardPage;