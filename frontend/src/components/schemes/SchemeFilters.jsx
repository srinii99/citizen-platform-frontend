import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SchemeFilters({
  search,
  setSearch,
}) {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        p-5
        border
        border-slate-200
        mb-8
      "
    >

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* SEARCH */}

        <div className="md:col-span-3">

          <Input
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* BUTTON */}

        <Button className="w-full">

          Search

        </Button>

      </div>

    </div>
  );
}