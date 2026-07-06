import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './Icons';
import { HeroBookingField } from './HeroBookingField';

export interface Hotel {
  id: string;
  name: string;
}

interface HotelDropdownProps {
  hotels: Hotel[];
  selected: Hotel;
  onSelect: (hotel: Hotel) => void;
  variant?: 'default' | 'hero';
  label?: string;
}

export function HotelDropdown({ hotels, selected, onSelect, variant = 'default', label }: HotelDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (variant === 'hero') {
    return (
      <HeroBookingField
        fieldRef={ref}
        label={label ?? ''}
        onClick={() => setOpen(!open)}
        dropdown={
          open ? (
            <ul className="booking-dropdown">
              {hotels.map((hotel) => (
                <li key={hotel.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(hotel);
                      setOpen(false);
                    }}
                    className={`w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-surface-muted ${
                      hotel.id === selected.id ? 'font-medium text-primary' : 'text-text'
                    }`}
                  >
                    {hotel.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null
        }
      >
        <span className="booking-value truncate">{selected.name}</span>
      </HeroBookingField>
    );
  }

  return (
    <div ref={ref} className="relative min-w-0 flex-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-2 text-left text-sm font-medium text-text"
      >
        <span className="truncate">{selected.name}</span>
        <ChevronDownIcon size={20} className="shrink-0 text-text-muted" />
      </button>
      {open && (
        <ul className="absolute top-full left-0 z-50 mt-2 min-w-full rounded-lg border border-border bg-white py-1 shadow-lg">
          {hotels.map((hotel) => (
            <li key={hotel.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(hotel);
                  setOpen(false);
                }}
                className={`w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-surface-muted ${
                  hotel.id === selected.id ? 'font-medium text-primary' : 'text-text'
                }`}
              >
                {hotel.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
