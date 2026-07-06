import { CheckIcon } from './Icons';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`booking-toggle${checked ? ' booking-toggle--on' : ''}`}
    >
      <span className="booking-toggle-knob">{checked ? <CheckIcon size={10} /> : null}</span>
    </button>
  );
}
