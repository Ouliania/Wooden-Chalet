import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { hotelsList } from '../constants/hotels';
import { ArrowSubmitIcon } from './ui/Icons';

const menuLinks = [
  'home', 'weddings', 'offers', 'about', 'awards', 'team', 'account', 'contacts', 'gallery',
] as const;

const socials = ['Instagram', 'Facebook', 'Twitter', 'Youtube'];

const scrollLinks: Partial<Record<(typeof menuLinks)[number], string>> = {
  gallery: '#gallery',
  contacts: '#faq',
};

export function Footer() {
  const { t } = useLanguage();
  const { openModal } = useModal();
  const [agreed, setAgreed] = useState(true);
  const [email, setEmail] = useState('');

  const handleLink = (label: string, href?: string) => {
    if (href) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    openModal({ type: 'placeholder', title: label, message: t.comingSoonDesc });
  };

  const handleSubscribe = () => {
    if (!email.trim() || !agreed) return;
    openModal({ type: 'subscribe' });
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="page-container footer-grid">

        <div className="footer-col">
          <h5 className="footer-col-title">{t.hotelsAndResorts}</h5>
          <ul className="footer-links">
            {hotelsList.map((hotel) => (
              <li key={hotel.id}>
                <button
                  type="button"
                  className="footer-link footer-link-btn"
                  onClick={() => handleLink(hotel.name)}
                >
                  {hotel.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h5 className="footer-col-title">{t.menu}</h5>
          <ul className="footer-links">
            {menuLinks.map((key) => (
              <li key={key}>
                <button
                  type="button"
                  className="footer-link footer-link-btn"
                  onClick={() => handleLink(t[key], scrollLinks[key])}
                >
                  {t[key]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <ul className="footer-links">
            {socials.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="footer-link footer-link-btn"
                  onClick={() => handleLink(s)}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col footer-col--newsletter">
          <p className="footer-subscribe-title">{t.subscribe}</p>
          <div className="footer-input-wrap">
            <div className="footer-input-row">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="footer-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="footer-submit-btn"
                aria-label="Subscribe"
                onClick={handleSubscribe}
              >
                <ArrowSubmitIcon size={20} />
              </button>
            </div>
            <label className="footer-checkbox-row">
              <input
                type="checkbox"
                className="footer-checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="footer-checkbox-label">
                {t.readAgree}
                <button
                  type="button"
                  className="footer-terms-link footer-link-btn"
                  onClick={() => handleLink(t.termsPrivacy)}
                >
                  {t.termsPrivacy}
                </button>
              </span>
            </label>
          </div>
          <p className="footer-desc">{t.footerDesc}</p>
        </div>
      </div>

      <div className="page-container footer-bottom">
        {(['privacy', 'terms', 'sitemap', 'gdpr'] as const).map((key) => (
          <button
            key={key}
            type="button"
            className="footer-bottom-link footer-link-btn"
            onClick={() => handleLink(t[key])}
          >
            {t[key]}
          </button>
        ))}
      </div>
    </footer>
  );
}
