export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700",

    secondary:
      "bg-slate-200 text-slate-800 hover:bg-slate-300",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    outline:
      "border border-slate-300 text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      disabled={disabled}
      className={`
        px-4 py-2
        rounded-xl
        font-medium
        transition-all duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}