import { type ReactNode } from "react";

interface ChipProps {
    active?: boolean;
    onClick?: () => void;
    children: ReactNode;
}

export function Chip({ active = false, onClick, children }: ChipProps) {
    return (
        <button
            type="button"
            className={[
                'whitespace-nowrap rounded-[12px] px-3.5 py-2 text-[13px] font-display font-bold tracking-tight transition-colors',
                active ? 'bg-teal text-white' : 'bg-card text-muted border border-line hover:border-teal/40',
            ].join(' ')}
            onClick={onClick}
        >
            {children}
        </button>
    );
}