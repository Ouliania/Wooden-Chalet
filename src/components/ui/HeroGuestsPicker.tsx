import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HeroBookingField } from './HeroBookingField';
import { MinusIcon, PlusIcon } from './Icons';

interface HeroGuestsPickerProps {
  adults: number;
  children: number;
  rooms: number;
  onAdultsChange: (value: number) => void;
  onChildrenChange: (value: number) => void;
  onRoomsChange: (value: number) => void;
  label: string;
}

interface CounterRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function CounterRow({ label, value, min, max, onChange }: CounterRowProps) {
  return (
    <div className="guests-picker-row">
      <span className="guests-picker-label">{label}</span>
      <div className="guests-picker-counter">
        <button
          type="button"
          className="guests-picker-counter-btn"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label}`}
        >
          <MinusIcon size={14} />
        </button>
        <span className="guests-picker-counter-value">{value}</span>
        <button
          type="button"
          className="guests-picker-counter-btn"
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label}`}
        >
          <PlusIcon size={14} />
        </button>
      </div>
    </div>
  );
}

export function HeroGuestsPicker({
  adults,
  children,
  rooms,
  onAdultsChange,
  onChildrenChange,
  onRoomsChange,
  label,
}: HeroGuestsPickerProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <HeroBookingField
      fieldRef={ref}
      label={label}
      onClick={() => {
        if (!open) setOpen(true);
      }}
      dropdown={
        open ? (
          <div className="guests-picker-panel">
            <CounterRow
              label={t.adultsFull}
              value={adults}
              min={1}
              max={10}
              onChange={onAdultsChange}
            />
            <CounterRow
              label={t.childrenFull}
              value={children}
              min={0}
              max={10}
              onChange={onChildrenChange}
            />
            <CounterRow
              label={t.roomsFull}
              value={rooms}
              min={1}
              max={5}
              onChange={onRoomsChange}
            />
          </div>
        ) : null
      }
    >
      <span className="booking-value truncate">
        {adults} {t.adults}
        {children > 0 && (
          <>
            {' '}
            + {children} {children !== 1 ? t.childrenAlt : t.childAlt}
          </>
        )}
        {' '}
        <span className="text-text-light">
          / {rooms} {rooms === 1 ? t.roomUnit : t.roomsUnit}
        </span>
      </span>
    </HeroBookingField>
  );
}
