import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "accent" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
}

const base = 'font-display font-extrabold text-[15px] tracking-tight rounded-[14px] px-5 py-3.5 ' +
  'inline-flex items-center justify-center gap-2 transition-colors ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
    primary: 'bg-teal hover:bg-teal-dark text-white',     // acción principal
    accent: 'bg-lime hover:bg-lime-dark text-teal-ink',   // CTA del hero
    ghost: 'bg-transparent text-ink hover:bg-line-soft border border-line', // "Limpiar"
};


export function Button({ variant = 'primary', fullWidth, className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
}