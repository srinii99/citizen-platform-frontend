export default function ApplicationSkeleton() {

  return (

    <div
      className="
        bg-white
        rounded-3xl
        p-6
        border
        border-slate-200
        animate-pulse
      "
    >

      <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />

      <div className="h-8 bg-slate-200 rounded w-2/3 mb-6" />

      <div className="h-4 bg-slate-200 rounded mb-3" />

      <div className="h-4 bg-slate-200 rounded w-5/6 mb-8" />

      <div className="h-12 bg-slate-200 rounded-2xl" />

    </div>
  );
}