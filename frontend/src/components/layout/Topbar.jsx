import {
  FiBell,
  FiMenu,
} from "react-icons/fi";

export default function Topbar({
  setMobileOpen,
}) {

  return (

    <header
      className="
        h-24
        bg-white
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        px-4
        md:px-8
        sticky
        top-0
        z-30
      "
    >

      {/* LEFT */}

      <div className="flex items-center gap-4">

        {/* MOBILE MENU */}

        <button
          className="lg:hidden"
          onClick={() =>
            setMobileOpen(true)
          }
        >

          <FiMenu className="text-3xl text-slate-700" />

        </button>

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            Dashboard

          </h1>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* NOTIFICATIONS */}

        <button
          className="
            w-14
            h-14
            rounded-2xl
            bg-slate-100
            flex
            items-center
            justify-center
            text-slate-700
            hover:bg-slate-200
            transition-all
          "
        >

          <FiBell className="text-2xl" />

        </button>

        {/* AI TAG */}

        <div
          className="
            hidden
            md:flex
            items-center
            px-6
            py-3
            rounded-2xl
            bg-blue-100
            text-blue-600
            font-semibold
          "
        >

          AI Recommendations Enabled

        </div>

      </div>

    </header>
  );
}