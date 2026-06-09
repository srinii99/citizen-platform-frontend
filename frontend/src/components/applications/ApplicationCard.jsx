import { motion } from "framer-motion";

import {
  FiCalendar,
  FiFileText,
} from "react-icons/fi";

import Card from "../ui/Card";

import ApplicationTimeline from "./ApplicationTimeline";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

export default function ApplicationCard({
  application,
}) {

  return (

    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >

      <Card>

        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">

          <div>

            <div className="flex items-center gap-2 mb-3">

              <FiFileText className="text-blue-600" />

              <p className="text-sm text-slate-500">

                Application ID:
                {" "}
                {application._id.slice(-6)}

              </p>

            </div>

            <h2 className="text-2xl font-bold text-slate-800">

              {application.scheme?.name}

            </h2>

          </div>

          <ApplicationStatusBadge
            status={application.status}
          />

        </div>

        {/* META */}

        <div className="mt-5 flex items-center gap-2 text-slate-500">

          <FiCalendar />

          <p className="text-sm">

            Applied on:
            {" "}
            {
              new Date(
                application.createdAt
              ).toLocaleDateString()
            }

          </p>

        </div>

        {/* TIMELINE */}

        <ApplicationTimeline
          status={application.status}
        />

        {/* REMARKS */}

        {
          application.adminRemarks && (

            <div
              className="
                mt-6
                bg-slate-50
                border
                border-slate-200
                rounded-2xl
                p-4
              "
            >

              <p className="text-sm text-slate-500 mb-1">

                Admin Remarks

              </p>

              <p className="text-slate-700">

                {application.adminRemarks}

              </p>

            </div>
          )
        }

      </Card>

    </motion.div>
  );
}