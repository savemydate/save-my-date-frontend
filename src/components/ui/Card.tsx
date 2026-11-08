import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "bordered";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "glass", children, ...props }, ref) => {
    const variantStyles = {
      glass: "bg-white/85 backdrop-blur-md border border-gold/30 shadow-xs",
      solid: "bg-white border border-champagne shadow-sm",
      bordered: "bg-champagne/40 border border-gold/40 shadow-xs",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-3xl p-6 sm:p-7 transition-all duration-200", variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
