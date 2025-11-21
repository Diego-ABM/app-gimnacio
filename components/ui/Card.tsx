import type React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  onClick,
  hoverable = false,
}: CardProps) {
  const baseStyles =
    "bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 shadow-[var(--shadow-sm)]";
  const hoverStyles = hoverable
    ? "hover:shadow-[var(--shadow-md)] hover:border-[var(--primary)] transition-all duration-200 cursor-pointer active:scale-[0.98]"
    : "";

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Interactive role and keyboard support are handled conditionally
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
