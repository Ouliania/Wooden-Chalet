import type { KeyboardEvent, ReactNode, Ref } from 'react';
import { ChevronDownIcon } from './Icons';

interface HeroBookingFieldProps {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  fieldRef?: Ref<HTMLDivElement>;
  dropdown?: ReactNode;
}

function handleKeyDown(e: KeyboardEvent<HTMLDivElement>, onClick: () => void) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick();
  }
}

export function HeroBookingField({ label, children, onClick, fieldRef, dropdown }: HeroBookingFieldProps) {
  return (
    <div ref={fieldRef} className="booking-field-wrap">
      <div
        className={`booking-field${onClick ? ' booking-field--interactive' : ''}`}
        onClick={onClick}
        onKeyDown={onClick ? (e) => handleKeyDown(e, onClick) : undefined}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="booking-field-inner">
          <span className="booking-label">{label}</span>
          <div className="booking-value-row">{children}</div>
        </div>
        <div className="booking-field-arrow" aria-hidden="true">
          <ChevronDownIcon size={20} className="shrink-0 text-text" />
        </div>
      </div>
      {dropdown}
    </div>
  );
}
