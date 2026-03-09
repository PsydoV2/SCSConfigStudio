import type { ReactNode } from "react";

type BadgeVariant = "modified" | "warning" | "accent";

interface BadgeProps {
  variant: BadgeVariant;
  children: ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>{children}</span>
  );
}
