import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { assets } from '../../assets';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface CustomDatePickerProps {
  date: string;
  setDate: (date: string) => void;
  label: string;
  variant?: 'booking' | 'hero' | 'chooseRoom';
  icon?: string;
}

export function CustomDatePicker({ date, setDate, label, variant = 'booking', icon }: CustomDatePickerProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const [year, month, day] = date.split('-');
  const initialDate = new Date(Number(year), Number(month) - 1, Number(day));

  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const handleSelectDate = (d: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
    const formatted = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
    setDate(formatted);
    setIsOpen(false);
  };

  const selectedDateObj = new Date(Number(year), Number(month) - 1, Number(day));
  const monthName = selectedDateObj.toLocaleDateString(t.locale, { month: 'long' });
  const dayPadded = String(selectedDateObj.getDate()).padStart(2, '0');
  const formattedDate =
    variant === 'chooseRoom'
      ? `${year} ${monthName} ${dayPadded}`
      : selectedDateObj.toLocaleDateString(t.locale, {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        });

  return (
    <div className="relative w-full" ref={containerRef}>
      {variant === 'chooseRoom' ? (
        <button
          type="button"
          className="choose-room-date-card"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="choose-room-date-main">
            {icon ? (
              <span className="choose-room-date-icon">
                <img src={icon} alt="" />
              </span>
            ) : null}
            <span className="choose-room-date-text">
              <span className="choose-room-date-label">{label}</span>
              <span className="choose-room-date-value">{formattedDate}</span>
            </span>
          </span>
          <img src={assets.ui.calendar} alt="" className="choose-room-date-calendar" />
        </button>
      ) : variant === 'booking' ? (
        <>
          <button
            type="button"
            className="mb-1 flex cursor-pointer items-center gap-2 text-xs text-text-muted uppercase"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img src={assets.ui.calendar} alt="" className="h-3.5 w-3.5" />
            {label}
          </button>
          <button
            type="button"
            className="w-full cursor-pointer bg-transparent text-left font-medium text-primary capitalize outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedDateObj.toLocaleDateString(t.locale, { year: 'numeric', month: 'long', day: '2-digit' })}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="booking-value w-full cursor-pointer truncate text-left capitalize"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedDateObj.toLocaleDateString(t.locale, { month: 'short', day: '2-digit', year: 'numeric' })}
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 z-50 mt-4 w-[280px] rounded-sm border border-border bg-white p-4 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <button type="button" onClick={handlePrevMonth} className="cursor-pointer rounded-sm p-1.5 transition-colors hover:bg-surface-muted">
                <ChevronLeftIcon size={16} />
              </button>
              <div className="text-sm font-medium text-text capitalize">
                {currentMonth.toLocaleDateString(t.locale, { month: 'long', year: 'numeric' })}
              </div>
              <button type="button" onClick={handleNextMonth} className="cursor-pointer rounded-sm p-1.5 transition-colors hover:bg-surface-muted">
                <ChevronRightIcon size={16} />
              </button>
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-text-muted">
              {t.days.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {blanks.map((b) => (
                <div key={`blank-${b}`} className="p-2" />
              ))}
              {days.map((d) => {
                const isSelected =
                  selectedDateObj.getDate() === d &&
                  selectedDateObj.getMonth() === currentMonth.getMonth() &&
                  selectedDateObj.getFullYear() === currentMonth.getFullYear();
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleSelectDate(d)}
                    className={`cursor-pointer rounded-sm p-2 transition-colors ${
                      isSelected ? 'bg-primary font-medium text-white' : 'text-text hover:bg-orange-50'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
