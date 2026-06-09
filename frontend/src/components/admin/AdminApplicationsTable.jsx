import {
  useState,
} from "react";

import {
  FiEye,
} from "react-icons/fi";

import Card from "../ui/Card";
import Button from "../ui/Button";

import AdminStatusBadge from "./AdminStatusBadge";
import AdminReviewModal from "./AdminReviewModal";

export default function AdminApplicationsTable({
  applications,
  onApprove,
  onReject,
  onRequestInfo,
  onStatusUpdate,
}) {

  const [selectedApp, setSelectedApp] =
    useState(null);

  return (

    <>
      <Card className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200 text-left">

              <th className="pb-4">

                Scheme

              </th>

              <th className="pb-4">

                Status

              </th>

              <th className="pb-4">

                Payment

              </th>

              <th className="pb-4">

                Affidavit

              </th>

              <th className="pb-4">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {applications.map((app) => (

              <tr
                key={app._id}
                className="border-b border-slate-100"
              >

                <td className="py-5">

                  <div>

                    <p className="font-semibold text-slate-800">

                      {app.scheme_id?.name}

                    </p>

                    <p className="text-sm text-slate-500">

                      {app._id}

                    </p>

                  </div>

                </td>

                <td className="py-5">

                  <AdminStatusBadge
                    status={app.status}
                  />

                </td>

                <td className="py-5">

                  {app.payment_status}

                </td>

                <td className="py-5">

                  {app.affidavit_status}

                </td>

                <td className="py-5">

                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() =>
                      setSelectedApp(app)
                    }
                  >

                    <FiEye />

                    Review

                  </Button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </Card>

      {/* MODAL */}

      <AdminReviewModal
        open={!!selectedApp}
        application={selectedApp}
        onClose={() =>
          setSelectedApp(null)
        }

        onStatusUpdate={
          onStatusUpdate
        }
        onApprove={onApprove}
        onReject={onReject}
        onRequestInfo={
          onRequestInfo
        }
      />
    </>
  );
}