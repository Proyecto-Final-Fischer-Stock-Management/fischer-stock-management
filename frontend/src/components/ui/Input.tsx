import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

export default function Input({
  className = "",
  fullWidth = false,
  ...props
}: InputProps) {
  return (
    <input
      className={[
        "px-4 py-2 border border-gray-300 shadow-sm text-center text-gray-700 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
        fullWidth ? "w-full" : "w-64",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
