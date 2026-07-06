import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { HeroBookingField } from './HeroBookingField';
import { ChevronsLeftIcon, ChevronsRightIcon } from './Icons';

interface HeroDateRangePickerProps {
  arrivalDate: string;
  departureDate: string;
  onArrivalChange: (date: string) => void;
  onDepartureChange: (date: string) => void;
  label: string;
}

type DateTab = 'exact' | 'flexible';

const FLEX_DAY_OPTIONS = [1, 2, 3, 7] as const;

function parseDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

function formatDateISO(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function dayTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function formatDisplayRange(start: string, end: string, locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long', day: '2-digit' });
  return `${formatter.format(parseDate(start))} – ${formatter.format(parseDate(end))}`;
}

function getOrderedRange(start: Date, end: Date) {
  return start <= end ? [start, end] : [end, start];
}

interface MonthGridProps {
  month: Date;
  rangeStart: Date;
  rangeEnd: Date | null;
  flexDays?: number;
  weekdays: readonly string[];
  locale: string;
  showPrev?: boolean;
  showNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onSelect: (date: Date) => void;
}

function MonthGrid({
  month,
  rangeStart,
  rangeEnd,
  flexDays = 0,
  weekdays,
  locale,
  showPrev,
  showNext,
  onPrev,
  onNext,
  onSelect,
}: MonthGridProps) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const blanks = Array.from({ length: firstWeekday }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const [lo, hi] = rangeEnd ? getOrderedRange(rangeStart, rangeEnd) : [rangeStart, null];
  const flexLo = hi && flexDays > 0 ? addDays(lo, -flexDays) : null;
  const flexHi = hi && flexDays > 0 ? addDays(hi, flexDays) : null;

  return (
    <div>
      <div className="date-picker-month-header">
        {showPrev ? (
          <button type="button" className="date-picker-nav" onClick={onPrev} aria-label="Previous months">
            <ChevronsLeftIcon size={16} />
          </button>
        ) : (
          <span className="w-6" />
        )}
        <div className="date-picker-month-title">
          {month.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </div>
        {showNext ? (
          <button type="button" className="date-picker-nav date-picker-nav--next" onClick={onNext} aria-label="Next months">
            <ChevronsRightIcon size={16} />
          </button>
        ) : (
          <span className="w-6" />
        )}
      </div>

      <div className="date-picker-weekdays">
        {weekdays.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="date-picker-days">
        {blanks.map((blank) => (
          <span key={`blank-${blank}`} />
        ))}
        {days.map((day) => {
          const date = new Date(year, monthIndex, day);
          const time = dayTime(date);
          const isStart = isSameDay(date, rangeStart);
          const isEnd = rangeEnd ? isSameDay(date, rangeEnd) : false;
          const inRange = hi ? time > dayTime(lo) && time < dayTime(hi) : false;
          const isSelected = isStart || isEnd;
          const isFlexZone =
            flexLo &&
            flexHi &&
            hi &&
            time >= dayTime(flexLo) &&
            time <= dayTime(flexHi) &&
            !isSelected &&
            !inRange;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(date)}
              className={[
                'date-picker-day',
                inRange || (isStart && rangeEnd) || (isEnd && rangeEnd) ? 'date-picker-day--in-range' : '',
                isStart && rangeEnd ? 'date-picker-day--range-start' : '',
                isEnd && rangeEnd ? 'date-picker-day--range-end' : '',
                isSelected ? 'date-picker-day--selected' : '',
                isFlexZone ? 'date-picker-day--flex-zone' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="date-picker-day-inner">{day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DatePickerCalendarsProps {
  leftMonth: Date;
  rightMonth: Date;
  rangeStart: Date;
  rangeEnd: Date | null;
  flexDays: number;
  weekdays: readonly string[];
  locale: string;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (date: Date) => void;
}

function DatePickerCalendars({
  leftMonth,
  rightMonth,
  rangeStart,
  rangeEnd,
  flexDays,
  weekdays,
  locale,
  onPrev,
  onNext,
  onSelect,
}: DatePickerCalendarsProps) {
  return (
    <div className="date-picker-calendars">
      <MonthGrid
        month={leftMonth}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        flexDays={flexDays}
        weekdays={weekdays}
        locale={locale}
        showPrev
        onPrev={onPrev}
        onSelect={onSelect}
      />
      <MonthGrid
        month={rightMonth}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        flexDays={flexDays}
        weekdays={weekdays}
        locale={locale}
        showNext
        onNext={onNext}
        onSelect={onSelect}
      />
    </div>
  );
}

export function HeroDateRangePicker({
  arrivalDate,
  departureDate,
  onArrivalChange,
  onDepartureChange,
  label,
}: HeroDateRangePickerProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<DateTab>('exact');
  const [flexDays, setFlexDays] = useState(2);
  const [leftMonth, setLeftMonth] = useState(() => parseDate(arrivalDate));

  const rangeStart = parseDate(arrivalDate);
  const rangeEnd = parseDate(departureDate);
  const rightMonth = new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1, 1);
  const visibleRangeEnd = isSameDay(rangeStart, rangeEnd) ? null : rangeEnd;
  const activeFlexDays = tab === 'flexible' ? flexDays : 0;

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

  const handleDaySelect = (date: Date) => {
    const iso = formatDateISO(date);
    const hasRange = !isSameDay(rangeStart, rangeEnd);

    if (!hasRange) {
      if (isSameDay(date, rangeStart)) return;
      if (date >= rangeStart) {
        onDepartureChange(iso);
      } else {
        onDepartureChange(formatDateISO(rangeStart));
        onArrivalChange(iso);
      }
      return;
    }

    onArrivalChange(iso);
    onDepartureChange(iso);
  };

  const shiftMonths = (delta: number) => {
    setLeftMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() + delta, 1));
  };

  const displayValue =
    tab === 'flexible'
      ? `${formatDisplayRange(arrivalDate, departureDate, t.locale)} ±${flexDays} ${t.daysShort}`
      : formatDisplayRange(arrivalDate, departureDate, t.locale);

  return (
    <HeroBookingField
      fieldRef={ref}
      label={label}
      onClick={() => {
        if (!open) setOpen(true);
      }}
      dropdown={
        open ? (
          <div className="date-picker-panel">
            <div className="date-picker-tabs">
              <button
                type="button"
                className={`date-picker-tab${tab === 'exact' ? ' date-picker-tab--active' : ''}`}
                onClick={() => setTab('exact')}
              >
                {t.exactDates}
              </button>
              <button
                type="button"
                className={`date-picker-tab${tab === 'flexible' ? ' date-picker-tab--active' : ''}`}
                onClick={() => setTab('flexible')}
              >
                {t.imFlexible}
              </button>
            </div>

            <div className="date-picker-body">
              <DatePickerCalendars
                leftMonth={leftMonth}
                rightMonth={rightMonth}
                rangeStart={rangeStart}
                rangeEnd={visibleRangeEnd}
                flexDays={activeFlexDays}
                weekdays={t.weekdays}
                locale={t.locale}
                onPrev={() => shiftMonths(-1)}
                onNext={() => shiftMonths(1)}
                onSelect={handleDaySelect}
              />

              {tab === 'flexible' && (
                <div className="date-picker-flex-days">
                  <span className="date-picker-flex-label">{t.flexibleBy}</span>
                  <div className="date-picker-flex-options">
                    {FLEX_DAY_OPTIONS.map((days) => (
                      <button
                        key={days}
                        type="button"
                        className={`date-picker-flex-option${flexDays === days ? ' date-picker-flex-option--active' : ''}`}
                        onClick={() => setFlexDays(days)}
                      >
                        ±{days} {t.daysShort}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null
      }
    >
      <span className="booking-value truncate">{displayValue}</span>
    </HeroBookingField>
  );
}
