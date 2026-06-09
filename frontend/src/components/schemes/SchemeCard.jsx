import { motion } from "framer-motion";

import {
  FiAlertCircle,
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

function SchemeCard({
  scheme,
  isEligible,
  applyingId,
  applyForScheme,
}) {

  // -------------------------
  // MATCH COLOR
  // -------------------------

  const getMatchVariant = (
    percentage
  ) => {

    if (percentage >= 80) {
      return "success";
    }

    if (percentage >= 50) {
      return "warning";
    }

    return "danger";
  };

  return (

    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >

      <Card className="h-full flex flex-col justify-between">

        {/* TOP */}

        <div>

          {/* HEADER */}

          <div className="flex items-start justify-between gap-4 mb-5">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <Badge variant="info">

                  <span className="flex items-center gap-1">

                    <FiBriefcase />

                    Welfare Scheme

                  </span>

                </Badge>

                {isEligible ? (

                  <Badge variant="success">

                    Eligible

                  </Badge>

                ) : (

                  <Badge variant="warning">

                    Partial Match

                  </Badge>

                )}

              </div>

              <h2 className="text-2xl font-bold text-slate-800 leading-snug">

                {scheme.title}

              </h2>

            </div>

            {/* MATCH */}

            <Badge
              variant={getMatchVariant(
                scheme.matchPercentage
              )}
            >

              <span className="flex items-center gap-1">

                <FiTrendingUp />

                {scheme.matchPercentage}% Match

              </span>

            </Badge>

          </div>

          {/* BENEFITS */}

          <p className="text-slate-600 leading-relaxed mb-5">

            {scheme.benefits}

          </p>

          {/* DEPARTMENT */}

          <div
            className="
              bg-slate-50
              rounded-2xl
              p-4
              mb-5
              border
              border-slate-100
            "
          >

            <p className="text-sm text-slate-500 mb-1">

              Department

            </p>

            <p className="font-medium text-slate-700">

              {scheme.department}

            </p>

          </div>

          {/* REASONS */}

          {
            !isEligible &&
            scheme.reasons?.length > 0 && (

              <div
                className="
                  bg-red-50
                  border
                  border-red-100
                  rounded-2xl
                  p-4
                  mb-5
                "
              >

                <div className="flex items-center gap-2 mb-3">

                  <FiAlertCircle className="text-red-500" />

                  <h4 className="font-semibold text-red-600">

                    Eligibility Review

                  </h4>

                </div>

                <ul className="space-y-2">

                  {scheme.reasons.map(
                    (
                      reason,
                      index
                    ) => (

                      <li
                        key={index}
                        className="
                          text-sm
                          text-red-600
                          flex
                          items-start
                          gap-2
                        "
                      >

                        <span className="mt-1">

                          •

                        </span>

                        <span>

                          {reason}

                        </span>

                      </li>
                    )
                  )}

                </ul>

              </div>
            )
          }

        </div>

        {/* FOOTER */}

        <div className="mt-6">

          {
            isEligible ? (

              <Button
                onClick={() =>
                  applyForScheme(
                    scheme.schemeId
                  )
                }

                disabled={
                  applyingId ===
                  scheme.schemeId
                }

                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                {
                  applyingId ===
                  scheme.schemeId

                    ? "Applying..."

                    : (
                      <>
                        Apply Now
                        <FiArrowRight />
                      </>
                    )
                }

              </Button>

            ) : (

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-yellow-700
                  bg-yellow-50
                  border
                  border-yellow-100
                  rounded-2xl
                  p-4
                "
              >

                <FiCheckCircle />

                <p className="text-sm font-medium">

                  Complete profile requirements to improve eligibility.

                </p>

              </div>

            )
          }

        </div>

      </Card>

    </motion.div>
  );
}

export default SchemeCard;