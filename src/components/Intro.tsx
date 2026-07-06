import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { preventHangingWords } from '../utils/typography';

export function Intro() {
  const { t, lang } = useLanguage();
  const typo = (text: string) => preventHangingWords(text, lang);

  return (
    <section className="page-container py-24">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="intro-text"
      >
        <span className="intro-text-emphasis">{typo(t.intro1)}</span>
        {typo(t.intro2)}
        <span className="intro-text-emphasis">{typo(t.intro3)}</span>
        {typo(t.intro4)}
        {typo(t.introLine2)}
        <span className="intro-text-accent">{typo(t.intro5)}</span>
        {typo(t.intro6)}
        <span className="intro-text-emphasis">{typo(t.intro7)}</span>
        {typo(t.intro8)}
      </motion.p>
    </section>
  );
}
