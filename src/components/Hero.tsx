import { motion } from 'motion/react';
import { assets } from '../assets';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { hotelsList } from '../constants/hotels';
import { HotelDropdown } from './ui/HotelDropdown';
import { HeroDateRangePicker } from './ui/HeroDateRangePicker';
import { HeroBookingField } from './ui/HeroBookingField';
import { HeroGuestsPicker } from './ui/HeroGuestsPicker';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import { BurgerMenu } from './ui/BurgerMenu';
import type { Hotel } from './ui/HotelDropdown';

interface HeroProps {
  arrivalDate: string;
  setArrivalDate: (d: string) => void;
  departureDate: string;
  setDepartureDate: (d: string) => void;
  adults: number;
  children: number;
  rooms: number;
  setAdults: (n: number) => void;
  setChildren: (n: number) => void;
  setRooms: (n: number) => void;
  selectedHotel: Hotel;
  setSelectedHotel: (h: Hotel) => void;
}

function BookingDivider() {
  return <div className="booking-divider" aria-hidden="true" />;
}

export function Hero({
  arrivalDate,
  setArrivalDate,
  departureDate,
  setDepartureDate,
  adults,
  children,
  rooms,
  setAdults,
  setChildren,
  setRooms,
  selectedHotel,
  setSelectedHotel,
}: HeroProps) {
  const { t } = useLanguage();
  const { openModal } = useModal();

  const handleBookNow = () => {
    openModal({
      type: 'booking',
      booking: {
        hotel: selectedHotel.name,
        room: t.roomTitle,
        arrivalDate,
        departureDate,
        adults,
        children,
        rooms,
      },
    });
  };

  return (
    <div className="relative flex min-h-[800px] h-screen flex-col">
      <div className="absolute inset-0 z-0">
        <img src={assets.hero} alt="Wooden Chalet" className="h-full w-full object-cover" />
        <div className="hero-image-gradient pointer-events-none absolute inset-0" aria-hidden="true" />
      </div>

      <nav className="page-container relative z-50 flex items-center justify-between py-6 nav-text text-text-white">
        <div className="hidden gap-6 xl:flex">
          <a href="#" className="nav-link">{t.menu}</a>
          <a href="#" className="nav-link">{t.hotelsAndResorts}</a>
        </div>
        <div className="hidden items-center gap-6 xl:flex">
          <a href="#" className="nav-link">{t.rooms}</a>
          <a href="#" className="nav-link">{t.activities}</a>
          <a href="#" className="nav-link">{t.dining}</a>
          <img src={assets.logo} alt="Aliya" className="h-12 w-12 object-contain" />
          <a href="#" className="nav-link">{t.ayurvedaAndSpa}</a>
          <a href="#" className="nav-link">{t.offers}</a>
        </div>

        <div className="relative flex w-full items-center xl:hidden">
          <BurgerMenu />
          <img
            src={assets.logo}
            alt="Aliya"
            className="absolute left-1/2 h-10 w-10 -translate-x-1/2 object-contain"
          />
          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="hidden items-center gap-6 xl:flex">
          <button
            type="button"
            className="nav-link nav-link-btn"
            onClick={() => openModal({ type: 'login' })}
          >
            {t.login}
          </button>
          <LanguageSwitcher />
        </div>
      </nav>

      <div className="hero-bottom page-container relative z-10 mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-title"
        >
          {t.wooden} {t.chalets}
        </motion.h1>

        <div className="booking-widget">
          <HotelDropdown
            hotels={hotelsList}
            selected={selectedHotel}
            onSelect={setSelectedHotel}
            variant="hero"
            label={t.hotel}
          />

          <BookingDivider />

          <HeroBookingField label={t.room} onClick={() => {}}>
            <span className="booking-value truncate">{t.roomTitle}</span>
          </HeroBookingField>

          <BookingDivider />

          <HeroDateRangePicker
            label={t.date}
            arrivalDate={arrivalDate}
            departureDate={departureDate}
            onArrivalChange={setArrivalDate}
            onDepartureChange={setDepartureDate}
          />

          <BookingDivider />

          <HeroGuestsPicker
            label={t.guestsAndRooms}
            adults={adults}
            children={children}
            rooms={rooms}
            onAdultsChange={setAdults}
            onChildrenChange={setChildren}
            onRoomsChange={setRooms}
          />

          <button type="button" className="booking-cta cursor-pointer" onClick={handleBookNow}>
            {t.bookNow}
          </button>
        </div>
      </div>
    </div>
  );
}
