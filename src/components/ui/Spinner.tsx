interface SpinnerProps {
    size?: number;
    className?: string;
}

export function Spinner({ size = 24, className = '' }: SpinnerProps) {
    return (
        <span
            role="status"
            aria-label="Cargando"
            className={`inline-block animate-spin rounded-full border-2 border-line border-t-teal ${className}`}
            style={{ width: size, height: size }}
        />      
    );
}