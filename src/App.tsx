import { useState } from 'react';
import { LanguageContext } from './context/LanguageContext';
import { ModalProvider } from './context/ModalContext';
import { translations, type LangType } from './i18n/translations';
import { hotelsList } from './constants/hotels';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { RoomDetails } from './components/RoomDetails';
import { BookingSection } from './components/BookingSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ModalHost } from './components/ModalHost';

export default function App() {
  const [lang, setLang] = useState<LangType>('Eng');
  const [arrivalDate, setArrivalDate] = useState('2026-06-05');
  const [departureDate, setDepartureDate] = useState('2026-06-12');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState(hotelsList[2]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <ModalProvider>
        <div className="min-h-screen bg-white font-sans text-text selection:bg-primary selection:text-white">
          <Hero
            arrivalDate={arrivalDate}
            setArrivalDate={setArrivalDate}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            adults={adults}
            children={children}
            rooms={rooms}
            setAdults={setAdults}
            setChildren={setChildren}
            setRooms={setRooms}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
          />
          <Intro />
          <RoomDetails />
          <BookingSection
            arrivalDate={arrivalDate}
            setArrivalDate={setArrivalDate}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            adults={adults}
            setAdults={setAdults}
            children={children}
            setChildren={setChildren}
            selectedHotel={selectedHotel}
          />
          <GallerySection />
          <FAQSection />
          <Footer />
          <ModalHost />
        </div>
      </ModalProvider>
    </LanguageContext.Provider>
  );
}
