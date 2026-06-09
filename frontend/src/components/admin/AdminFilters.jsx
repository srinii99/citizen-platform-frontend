import Input from "../ui/Input";

export default function AdminFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) {

  return (

    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-5
        mb-6
      "
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* SEARCH */}

        <Input
          placeholder="Search applications..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* STATUS */}

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="
            border
            border-slate-300
            rounded-xl
            px-4
            py-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >

          <option value="ALL">

            All Status

          </option>

          <option value="PENDING">

            Pending

          </option>

          <option value="UNDER_REVIEW">

            Under Review

          </option>

          <option value="APPROVED">

            Approved

          </option>

          <option value="REJECTED">

            Rejected

          </option>

        </select>

      </div>

    </div>
  );
}