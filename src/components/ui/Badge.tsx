import { type ReactNode } from "react";

type Variant = "count" | 'level' | 'sale';

interface BadgeProps {
    variant?: Variant;
    children: ReactNode;
    className?: string;
}

const variants: Record<Variant, string> = {
    count:
        'min-w-[18px] h-[18px] px-1 rounded-full bg-lime text-teal-ink ' +
        'text-[11px] font-display font-extrabold inline-flex items-center justify-center',
    level:
        'text-lime-dark bg-lime/15 px-1.5 py-0.5 rounded-md ' +
        'text-[9.5px] font-display font-bold tracking-[0.06em] uppercase inline-flex items-center',
    sale:
        'bg-lime text-teal-ink px-1.5 py-0.5 rounded-md ' +
        'text-[10px] font-display font-extrabold tracking-tight uppercase inline-flex items-center',
};

export function Badge({ variant = 'count', children, className = '' }: BadgeProps) {
    return <span className={`${variants[variant]} ${className}`}>{children}</span>;
}