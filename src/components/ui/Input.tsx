import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-charcoal tracking-wide"
          >
            {label}
            {props.required && <span className="text-gold-dark ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full min-h-[44px] px-4 py-2.5 rounded-2xl text-sm text-charcoal",
            "bg-white/90 border border-gold/30 transition-all duration-200",
            "placeholder:text-charcoal-muted/50",
            "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
            "disabled:opacity-50 disabled:bg-champagne/30 disabled:cursor-not-allowed",
            error && "border-red-400 focus:ring-red-400/50 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-red-500 font-medium pl-1">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-charcoal-muted pl-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rows = 3, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-medium text-charcoal tracking-wide"
          >
            {label}
            {props.required && <span className="text-gold-dark ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full px-4 py-3 rounded-2xl text-sm text-charcoal resize-none",
            "bg-white/90 border border-gold/30 transition-all duration-200",
            "placeholder:text-charcoal-muted/50",
            "focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold",
            "disabled:opacity-50 disabled:bg-champagne/30 disabled:cursor-not-allowed",
            error && "border-red-400 focus:ring-red-400/50 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-red-500 font-medium pl-1">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-charcoal-muted pl-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
