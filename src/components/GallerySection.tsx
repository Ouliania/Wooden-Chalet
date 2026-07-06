import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { assets } from '../assets';
import { useLanguage } from '../context/LanguageContext';
import { CloseIcon } from './ui/Icons';

const galleryItems = [
  { src: assets.gallery[0], icon: assets.icons.visibility },
  { src: assets.gallery[1], icon: assets.icons.cutlery },
  { src: assets.gallery[2], icon: assets.icons.visibility },
  { src: assets.gallery[3], icon: assets.icons.solidarity },
  { src: assets.gallery[4], icon: assets.icons.cutlery },
  { src: assets.gallery[5], icon: assets.icons.activity },
  { src: assets.gallery[6], icon: assets.icons.solidarity },
  { src: assets.gallery[7], icon: assets.icons.visibility },
  { src: assets.gallery[8], icon: assets.icons.visibility },
  { src: assets.gallery[9], icon: assets.icons.activity },
  { src: assets.gallery[10], icon: assets.icons.activity },
] as const;

const DEFAULT_ACTIVE = 4;

export function GallerySection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex, closeLightbox]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="page-container gallery-section-header">
        <h2 className="section-title">{t.gallery}</h2>
      </div>

      <div className="gallery-strip-scroll">
        <div className="gallery-strip" onMouseLeave={() => setActiveIndex(DEFAULT_ACTIVE)}>
        {galleryItems.map((item, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.button
              key={item.src}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => openLightbox(i)}
              className={`gallery-item${isActive ? ' gallery-item--active' : ''}`}
              aria-label={`Gallery ${i + 1}`}
            >
              <img src={item.src} alt="" className="gallery-item-image" />
              <div className={`gallery-item-overlay${isActive ? ' gallery-item-overlay--active' : ''}`} />
              <div className={`gallery-item-icon${isActive ? ' gallery-item-icon--active' : ''}`}>
                <img src={item.icon} alt="" />
              </div>
            </motion.button>
          );
        })}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery ${lightboxIndex + 1}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Close"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
          >
            <CloseIcon size={20} />
          </button>
          <img
            src={galleryItems[lightboxIndex].src}
            alt={`Gallery ${lightboxIndex + 1}`}
            className="gallery-lightbox-image"
          />
        </div>
      )}
    </section>
  );
}
