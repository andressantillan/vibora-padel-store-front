import { Minus, Plus } from 'lucide-react';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Stepper({ value, onChange, min = 1, max }: StepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1);

  return (
    <div className="inline-flex items-center rounded-[13px] border border-line bg-card">
      <button type="button" onClick={dec} disabled={value <= min} aria-label="Restar"
        className="grid place-items-center w-9 h-9 text-ink disabled:opacity-40">
        <Minus size={16} strokeWidth={2.4} />
      </button>
      <span className="w-8 text-center font-display font-extrabold text-[15px] text-ink">{value}</span>
      <button type="button" onClick={inc} disabled={max !== undefined && value >= max} aria-label="Sumar"
        className="grid place-items-center w-9 h-9 text-teal disabled:opacity-40">
        <Plus size={16} strokeWidth={2.4} />
      </button>
    </div>
  );
}