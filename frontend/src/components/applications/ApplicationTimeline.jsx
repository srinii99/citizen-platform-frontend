import {
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

export default function ApplicationTimeline({
  status,
}) {

  const steps = [
    "PENDING",
    "UNDER_REVIEW",
    "APPROVED",
  ];

  const currentIndex =
    steps.indexOf(status);

  return (

    <div className="flex items-center justify-between mt-6">

      {steps.map((step, index) => {

        const active =
          index <= currentIndex;

        return (

          <div
            key={step}
            className="flex-1 flex flex-col items-center relative"
          >

            {/* LINE */}

            {
              index !== steps.length - 1 && (

                <div
                  className={`
                    absolute
                    top-5
                    left-1/2
                    w-full
                    h-1
                    ${
                      index < currentIndex
                        ? "bg-green-500"
                        : "bg-slate-200"
                    }
                  `}
                />

              )
            }

            {/* ICON */}

            <div
              className={`
                z-10
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                ${
                  active
                    ? "bg-green-500 text-white"
                    : "bg-slate-200 text-slate-500"
                }
              `}
            >

              {
                active
                  ? <FiCheckCircle />
                  : <FiClock />
              }

            </div>

            {/* LABEL */}

            <p
              className={`
                mt-3
                text-xs
                text-center
                font-medium
                ${
                  active
                    ? "text-slate-800"
                    : "text-slate-400"
                }
              `}
            >

              {step.replace("_", " ")}

            </p>

          </div>
        );
      })}
    </div>
  );
}