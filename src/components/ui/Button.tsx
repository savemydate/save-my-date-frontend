import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "champagne" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "gold", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 active:scale-[0.98]";

    const variantStyles = {
      gold: "bg-gold text-white hover:bg-gold-dark shadow-sm shadow-gold/20 active:bg-gold-dark",
      champagne: "bg-champagne text-charcoal hover:bg-champagne-light border border-gold/20 shadow-xs",
      outline: "bg-transparent text-charcoal border border-gold/40 hover:bg-champagne/40 active:bg-champagne/60",
      ghost: "bg-transparent text-charcoal hover:bg-champagne/30 active:bg-champagne/50",
    };

    const sizeStyles = {
      sm: "min-h-[40px] px-3.5 py-1.5 text-xs rounded-full gap-1.5",
      md: "min-h-[44px] px-5 py-2.5 text-sm rounded-full gap-2", // Min 44px touch target
      lg: "min-h-[50px] px-6 py-3 text-base rounded-full gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
