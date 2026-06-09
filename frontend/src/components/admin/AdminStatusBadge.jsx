export default function AdminStatusBadge({
  status,
}) {

  const statusClasses = {
    PENDING:
      "bg-yellow-100 text-yellow-700",

    UNDER_REVIEW:
      "bg-blue-100 text-blue-700",

    APPROVED:
      "bg-green-100 text-green-700",

    REJECTED:
      "bg-red-100 text-red-700",
  };

  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${statusClasses[status]}
      `}
    >

      {status.replace("_", " ")}

    </span>
  );
}