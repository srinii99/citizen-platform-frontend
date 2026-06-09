export default function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-semibold text-slate-700">
        {title}
      </h2>

      <p className="text-slate-500 mt-2">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}