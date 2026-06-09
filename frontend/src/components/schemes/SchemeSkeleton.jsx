export default function SchemeSkeleton() {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        p-6
        animate-pulse
        border
        border-slate-200
      "
    >

      <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />

      <div className="h-8 bg-slate-200 rounded w-2/3 mb-5" />

      <div className="space-y-3 mb-6">

        <div className="h-4 bg-slate-200 rounded" />

        <div className="h-4 bg-slate-200 rounded" />

        <div className="h-4 bg-slate-200 rounded w-5/6" />

      </div>

      <div className="h-12 bg-slate-200 rounded-2xl" />

    </div>
  );
}