import type React from "react";

import { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--foreground)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          px-4 py-2 rounded-lg 
          bg-[var(--background)] 
          border border-[var(--border)]
          text-[var(--foreground)]
          focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent
          transition-all duration-200
          ${error ? "border-[var(--danger)]" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-sm text-[var(--danger)]">{error}</span>}
    </div>
  );
}
