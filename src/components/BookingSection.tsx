import { useState } from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { CustomDatePicker } from './ui/CustomDatePicker';
import { Toggle } from './ui/Toggle';
import { PlusIcon, MinusIcon } from './ui/Icons';
import type { Hotel } from './ui/HotelDropdown';

interface BookingSectionProps {
  arrivalDate: string;
  setArrivalDate: (d: string) => void;
  departureDate: string;
  setDepartureDate: (d: string) => void;
  adults: number;
  setAdults: (n: number) => void;
  children: number;
  setChildren: (n: number) => void;
  selectedHotel: Hotel;
}

function formatPrice(value: number, spaced = true): string {
  const rounded = Math.round(value);
  const num = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return spaced ? `$ ${num}` : `$${num}`;
}

export function BookingSection({
  arrivalDate,
  setArrivalDate,
  departureDate,
  setDepartureDate,
  adults,
  setAdults,
  children,
  setChildren,
  selectedHotel,
}: BookingSectionProps) {
  const { t } = useLanguage();
  const { openModal } = useModal();
  const [options, setOptions] = useState({
    breakfast: false,
    breakfastDinner: true,
    airport: true,
    lateCheckOut: false,
    crib: false,
  });

  const nights = Math.max(
    1,
    Math.ceil(
      Math.abs(new Date(departureDate).getTime() - new Date(arrivalDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const pricing = (() => {
    const nightlyRoomRate = 207;
    const roomCost = nightlyRoomRate * nights;

    let mealCost = 0;
    if (options.breakfastDinner) {
      const ratePerPerson = options.breakfast ? 40 : 70;
      mealCost =
        adults * ratePerPerson * nights + children * ratePerPerson * 0.5 * nights;
    } else if (options.breakfast) {
      mealCost = adults * 30 * nights + children * 15 * nights;
    }

    let fixedExtras = 0;
    if (options.airport) fixedExtras += 100;
    if (options.lateCheckOut) fixedExtras += 30;

    const extrasCost = mealCost + fixedExtras;
    const discount = roomCost * 0.1;
    const total = roomCost + extrasCost - discount;

    return { nightlyRoomRate, roomCost, mealCost, fixedExtras, extrasCost, discount, total };
  })();

  const formatDateFull = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(Number(year), Number(month) - 1, Number(day));
      const monthName = d.toLocaleDateString(t.locale, { month: 'long' });
      const dayPadded = String(d.getDate()).padStart(2, '0');
      return `${year} ${monthName} ${dayPadded}`;
    } catch {
      return dateStr;
    }
  };

  const formatDateShort = (dateStr: string) => formatDateFull(dateStr);

  const nightLabel = nights > 1 && nights < 5 ? t.night2 : nights >= 5 ? t.night5 : t.night1;

  const optionItems = [
    { id: 'breakfast' as const, label: t.bfast, icon: assets.icons.breakfast },
    { id: 'breakfastDinner' as const, label: t.hb, icon: assets.icons.halfboard },
    { id: 'airport' as const, label: t.transfer, icon: assets.icons.shuttle },
    { id: 'lateCheckOut' as const, label: t.lateOut, icon: assets.icons.lateCheckout },
    { id: 'crib' as const, label: t.crib, icon: assets.icons.crib },
  ];

  const summaryRows = [
    {
      label: t.checkIn,
      value: `${formatDateFull(arrivalDate)} ${t.after14}`,
    },
    {
      label: t.checkOut,
      value: `${formatDateFull(departureDate)} ${t.before12}`,
    },
    { label: t.childrenFull, value: String(children) },
    { label: t.adultsFull, value: String(adults) },
    { label: t.room, value: '1' },
    ...(options.breakfastDinner
      ? [{ label: t.hbSummary, value: t.includedP }]
      : options.breakfast
        ? [{ label: t.bfastSummary, value: t.included }]
        : []),
    ...(options.airport ? [{ label: t.transfer, value: t.included }] : []),
    ...(options.lateCheckOut ? [{ label: t.lateOut, value: t.included }] : []),
    ...(options.crib ? [{ label: t.crib, value: t.includedF }] : []),
    ...(pricing.extrasCost > 0
      ? [{ label: t.extras, value: formatPrice(pricing.extrasCost) }]
      : []),
    {
      label: `${t.for} ${nights} ${nightLabel}`,
      value: `${formatPrice(pricing.nightlyRoomRate, false)} x ${nights} = ${formatPrice(pricing.roomCost)}`,
    },
    { label: t.discount, value: '10%' },
  ];

  return (
    <section id="booking" className="page-container choose-room-section">
      <h2 className="choose-room-title">{t.chooseRoom}</h2>

      <div className="choose-room-grid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="choose-room-options"
        >
          <h3 className="choose-room-panel-title">{t.selectOptions}</h3>

          <div className="choose-room-options-body">
            <div className="choose-room-dates-block">
              <div className="choose-room-nights-row">
                <span className="choose-room-nights-label">{t.totalNights}</span>
                <span className="choose-room-nights-value">
                  {nights} {nightLabel}
                </span>
              </div>

              <div className="choose-room-dates">
                <CustomDatePicker
                  date={arrivalDate}
                  setDate={setArrivalDate}
                  label={t.arrival}
                  variant="chooseRoom"
                  icon={assets.icons.arrival}
                />
                <CustomDatePicker
                  date={departureDate}
                  setDate={setDepartureDate}
                  label={t.departure}
                  variant="chooseRoom"
                  icon={assets.icons.departure}
                />
              </div>
            </div>

            <div className="choose-room-guests-block">
              <span className="choose-room-room-label">
                {t.room}: 1
              </span>
              <div className="choose-room-guests">
                <div className="choose-room-counter-card">
                  <span className="choose-room-counter-label">{t.childrenFull}</span>
                  <div className="choose-room-counter">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="choose-room-counter-btn"
                      aria-label={`${t.childrenFull} -`}
                    >
                      <MinusIcon size={18} />
                    </button>
                    <span className="choose-room-counter-value">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="choose-room-counter-btn"
                      aria-label={`${t.childrenFull} +`}
                    >
                      <PlusIcon size={18} />
                    </button>
                  </div>
                </div>
                <div className="choose-room-counter-card">
                  <span className="choose-room-counter-label">{t.adultsFull}</span>
                  <div className="choose-room-counter">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="choose-room-counter-btn"
                      aria-label={`${t.adultsFull} -`}
                    >
                      <MinusIcon size={18} />
                    </button>
                    <span className="choose-room-counter-value">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="choose-room-counter-btn"
                      aria-label={`${t.adultsFull} +`}
                    >
                      <PlusIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="choose-room-extras">
              {optionItems.map((opt) => (
                <div key={opt.id} className="choose-room-extra">
                  <div className="choose-room-extra-info">
                    <span className="choose-room-extra-icon">
                      <img src={opt.icon} alt="" />
                    </span>
                    <span className="choose-room-extra-label">{opt.label}</span>
                  </div>
                  <Toggle
                    checked={options[opt.id]}
                    onChange={() => {
                      setOptions((prev) => ({ ...prev, [opt.id]: !prev[opt.id] }));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="choose-room-confirm"
        >
          <h3 className="choose-room-panel-title">{t.confirm}</h3>

          <div className="choose-room-confirm-body">
            <div className="choose-room-summary">
              {summaryRows.map((row) => (
                <div key={row.label} className="choose-room-summary-row">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="choose-room-checkout">
              <div className="choose-room-total-row">
                <span className="choose-room-total-label">{t.total}</span>
                <motion.span
                  key={pricing.total}
                  initial={{ scale: 1.05, color: '#F6911A' }}
                  animate={{ scale: 1, color: '#0C0C0C' }}
                  className="choose-room-total-price"
                >
                  {formatPrice(pricing.total)}
                </motion.span>
              </div>

              <div className="choose-room-total-dates">
                <div className="choose-room-total-date">
                  <span className="choose-room-total-date-label">{t.arrival}</span>
                  <span className="choose-room-total-date-value">{formatDateShort(arrivalDate)}</span>
                </div>
                <div className="choose-room-total-date">
                  <span className="choose-room-total-date-label">{t.departure}</span>
                  <span className="choose-room-total-date-value">{formatDateShort(departureDate)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="choose-room-book-btn"
              onClick={() =>
                openModal({
                  type: 'booking',
                  booking: {
                    hotel: selectedHotel.name,
                    room: t.roomTitle,
                    arrivalDate,
                    departureDate,
                    adults,
                    children,
                    rooms: 1,
                    total: formatPrice(pricing.total),
                  },
                })
              }
            >
              {t.bookNow}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
