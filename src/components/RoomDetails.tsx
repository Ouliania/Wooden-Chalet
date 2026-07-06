import { useState } from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets';
import { useLanguage } from '../context/LanguageContext';
import { ChevronLeftIcon, ChevronRightIcon } from './ui/Icons';

export function RoomDetails() {
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);
  const roomImages = assets.room;

  const handlePrev = () =>
    setActiveImage((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1));
  const handleNext = () =>
    setActiveImage((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1));

  const amenities = [
    { icon: assets.icons.shower, label: t.amRainShower },
    { icon: assets.icons.balcony, label: t.amBalcony },
    { icon: assets.icons.bathtub, label: t.amBathtub },
    { icon: assets.icons.steam, label: t.amSteam },
    { icon: assets.icons.garden, label: t.amGarden },
    { icon: assets.icons.desk, label: t.amDesk },
    { icon: assets.icons.wifi, label: t.amWifi },
    { icon: assets.icons.ac, label: t.amAc },
    { icon: assets.icons.minibar, label: t.amMinibar },
    { icon: assets.icons.safe, label: t.amSafe },
  ];

  return (
    <section id="rooms" className="page-container py-12">
      <div className="about-room">
        <motion.aside
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-room-panel"
        >
          <div className="about-room-top">
            <div className="about-room-heading">
              <h2 className="about-room-title">{t.roomTitle}</h2>
              <p className="about-room-desc">{t.roomDesc}</p>
            </div>

            <div className="about-room-stats">
              <div className="about-room-stat">
                <span className="about-room-stat-label">{t.occupancy}</span>
                <span className="about-room-stat-value">
                  <span className="about-room-stat-num">{t.statOccupancyNum}</span>
                  <span>{t.statOccupancyLabel}</span>
                </span>
              </div>
              <div className="about-room-stat">
                <span className="about-room-stat-label">{t.roomSize ?? t.area}</span>
                <span className="about-room-stat-value">
                  <span className="about-room-stat-num">{t.areaVal}</span>
                  <span>{t.areaUnit}</span>
                </span>
              </div>
              <div className="about-room-stat">
                <span className="about-room-stat-label">{t.beds}</span>
                <span className="about-room-stat-value">
                  <span className="about-room-stat-num">{t.statBedsNum}</span>
                  <span>{t.statBedsLabel}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="about-room-amenities">
            {amenities.map((item) => (
              <div key={item.label} className="about-room-amenity">
                <div className="about-room-amenity-icon">
                  <img src={item.icon} alt="" />
                </div>
                <span className="about-room-amenity-label">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-room-gallery"
        >
          <div className="about-room-main">
            <img src={roomImages[activeImage]} alt={t.roomTitle} />
            <button
              type="button"
              onClick={handlePrev}
              className="about-room-nav about-room-nav--prev"
              aria-label="Previous photo"
            >
              <ChevronLeftIcon size={15} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="about-room-nav about-room-nav--next"
              aria-label="Next photo"
            >
              <ChevronRightIcon size={15} />
            </button>
          </div>

          <div className="about-room-thumbs">
            {roomImages.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`about-room-thumb${activeImage === i ? ' about-room-thumb--active' : ''}`}
                aria-label={`Photo ${i + 1}`}
                aria-current={activeImage === i}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
