import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

export function FAQSection() {
  const { t } = useLanguage();
  const { openModal } = useModal();

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
  ];

  return (
    <section id="faq" className="page-container faq-section">
      <div className="faq-section-header">
        <h2 className="section-title">{t.faqTitle}</h2>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <motion.div
            key={faq.q}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="faq-item"
          >
            <span className="faq-number" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="faq-content">
              <h4 className="faq-question">{faq.q}</h4>
              <p className="faq-answer">{faq.a}</p>
            </div>
            <span className="faq-number faq-number--end" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="faq-cta">
        <button
          type="button"
          className="faq-cta-btn"
          onClick={() => openModal({ type: 'contact' })}
        >
          {t.askMgr}
        </button>
      </div>
    </section>
  );
}
