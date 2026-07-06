import { useEffect, useState } from 'react';
import { assets } from '../../assets';
import { useLanguage } from '../../context/LanguageContext';
import { useModal } from '../../context/ModalContext';
import { CloseIcon, MenuIcon } from './Icons';
import { LanguageSwitcher } from './LanguageSwitcher';

export function BurgerMenu() {
  const { t } = useLanguage();
  const { openModal } = useModal();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const navItems = [
    t.menu,
    t.hotelsAndResorts,
    t.rooms,
    t.activities,
    t.dining,
    t.ayurvedaAndSpa,
    t.offers,
  ];

  const handleNav = (label: string) => {
    close();
    openModal({ type: 'placeholder', title: label, message: t.comingSoonDesc });
  };

  const handleLogin = () => {
    close();
    openModal({ type: 'login' });
  };

  return (
    <>
      <button
        type="button"
        className="burger-toggle xl:hidden"
        onClick={() => setOpen(true)}
        aria-label={t.menu}
        aria-expanded={open}
      >
        <MenuIcon size={24} />
      </button>

      {open ? (
        <>
          <div className="burger-backdrop" onClick={close} aria-hidden="true" />
          <div className="burger-panel" role="dialog" aria-modal="true" aria-label={t.menu}>
            <div className="burger-panel-header">
              <img src={assets.logo} alt="Aliya" className="burger-logo" />
              <button type="button" className="burger-close" onClick={close} aria-label="Close menu">
                <CloseIcon size={24} />
              </button>
            </div>

            <ul className="burger-links">
              {navItems.map((label) => (
                <li key={label}>
                  <button type="button" className="burger-link" onClick={() => handleNav(label)}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="burger-footer">
              <button type="button" className="burger-login" onClick={handleLogin}>
                {t.login}
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
