import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';
import { Modal } from './ui/Modal';

export function ModalHost() {
  const { t } = useLanguage();
  const { modal, closeModal } = useModal();
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  if (!modal) return null;

  const titles: Record<string, string> = {
    login: t.login,
    booking: t.bookingConfirmed,
    contact: t.askMgr,
    subscribe: t.subscribeSuccess,
    placeholder: modal.title ?? t.comingSoon,
  };

  const title = titles[modal.type] ?? modal.title ?? '';

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(Number(year), Number(month) - 1, Number(day));
      const monthName = d.toLocaleDateString(t.locale, { month: 'long' });
      return `${year} ${monthName} ${day}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <Modal open title={title} onClose={closeModal} size={modal.type === 'booking' ? 'md' : 'sm'}>
      {modal.type === 'login' && (
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
          <p className="modal-desc">{t.loginDesc}</p>
          <label className="modal-field">
            <span className="modal-label">{t.emailPlaceholder}</span>
            <input
              type="email"
              className="modal-input"
              value={loginForm.email}
              onChange={(e) => setLoginForm((f) => ({ ...f, email: e.target.value }))}
              placeholder={t.emailPlaceholder}
              required
            />
          </label>
          <label className="modal-field">
            <span className="modal-label">{t.password}</span>
            <input
              type="password"
              className="modal-input"
              value={loginForm.password}
              onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              required
            />
          </label>
          <button type="submit" className="modal-submit">{t.login}</button>
        </form>
      )}

      {modal.type === 'booking' && modal.booking && (
        <div className="modal-booking">
          <p className="modal-desc">{t.bookingDesc}</p>
          <dl className="modal-summary">
            <div className="modal-summary-row">
              <dt>{t.hotel}</dt>
              <dd>{modal.booking.hotel}</dd>
            </div>
            <div className="modal-summary-row">
              <dt>{t.room}</dt>
              <dd>{modal.booking.room}</dd>
            </div>
            <div className="modal-summary-row">
              <dt>{t.arrival}</dt>
              <dd>{formatDate(modal.booking.arrivalDate)}</dd>
            </div>
            <div className="modal-summary-row">
              <dt>{t.departure}</dt>
              <dd>{formatDate(modal.booking.departureDate)}</dd>
            </div>
            <div className="modal-summary-row">
              <dt>{t.adultsFull}</dt>
              <dd>{modal.booking.adults}</dd>
            </div>
            <div className="modal-summary-row">
              <dt>{t.childrenFull}</dt>
              <dd>{modal.booking.children}</dd>
            </div>
            <div className="modal-summary-row">
              <dt>{t.roomsFull}</dt>
              <dd>{modal.booking.rooms}</dd>
            </div>
            {modal.booking.total && (
              <div className="modal-summary-row modal-summary-row--total">
                <dt>{t.total}</dt>
                <dd>{modal.booking.total}</dd>
              </div>
            )}
          </dl>
          <button type="button" className="modal-submit" onClick={closeModal}>
            {t.gotIt}
          </button>
        </div>
      )}

      {modal.type === 'contact' && (
        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            closeModal();
            setContactForm({ name: '', email: '', message: '' });
          }}
        >
          <p className="modal-desc">{t.contactDesc}</p>
          <label className="modal-field">
            <span className="modal-label">{t.yourName}</span>
            <input
              type="text"
              className="modal-input"
              value={contactForm.name}
              onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </label>
          <label className="modal-field">
            <span className="modal-label">{t.emailPlaceholder}</span>
            <input
              type="email"
              className="modal-input"
              value={contactForm.email}
              onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </label>
          <label className="modal-field">
            <span className="modal-label">{t.yourMessage}</span>
            <textarea
              className="modal-textarea"
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
              required
            />
          </label>
          <button type="submit" className="modal-submit">{t.sendMessage}</button>
        </form>
      )}

      {modal.type === 'subscribe' && (
        <div className="modal-success">
          <p className="modal-desc">{t.subscribeDesc}</p>
          <button type="button" className="modal-submit" onClick={closeModal}>
            {t.gotIt}
          </button>
        </div>
      )}

      {modal.type === 'placeholder' && (
        <div className="modal-placeholder">
          <p className="modal-desc">{modal.message ?? t.comingSoonDesc}</p>
          <button type="button" className="modal-submit" onClick={closeModal}>
            {t.gotIt}
          </button>
        </div>
      )}
    </Modal>
  );
}
