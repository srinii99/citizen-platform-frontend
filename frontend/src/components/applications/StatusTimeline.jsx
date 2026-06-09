import {
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

export default function StatusTimeline({
  history = [],
}) {

  return (

    <div className="space-y-6">

      {history.map((item, index) => (

        <div
          key={index}
          className="flex gap-4"
        >

          {/* ICON */}

          <div
            className="
              flex
              flex-col
              items-center
            "
          >

            <div
              className="
                w-10
                h-10
                rounded-full
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              "
            >

              <FiCheckCircle />

            </div>

            {
              index !==
              history.length - 1 && (

                <div
                  className="
                    w-1
                    flex-1
                    bg-slate-200
                    mt-2
                  "
                />
              )
            }

          </div>

          {/* CONTENT */}

          <div className="pb-8">

            <h3 className="font-semibold text-slate-800">

              {item.status}

            </h3>

            <p className="text-sm text-slate-500 mt-1">

              {
                new Date(
                  item.updated_at
                ).toLocaleString()
              }

            </p>

            {
              item.admin_remarks && (

                <div
                  className="
                    mt-3
                    bg-slate-100
                    rounded-xl
                    p-4
                  "
                >

                  <p className="text-sm text-slate-700">

                    {
                      item.admin_remarks
                    }

                  </p>

                </div>
              )
            }

          </div>

        </div>

      ))}

    </div>
  );
}