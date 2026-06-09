import Card from "./Card";

export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <Card className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2 text-slate-800">
          {value}
        </h2>
      </div>

      <div
        className={`
          w-14 h-14
          rounded-2xl
          flex items-center justify-center
          text-2xl
          ${colorClasses[color] || colorClasses.blue}
        `}
      >
        {icon}
      </div>
    </Card>
  );
}