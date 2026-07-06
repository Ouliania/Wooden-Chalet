import { createContext, useContext } from 'react';
import { translations, type LangType, type Translation } from '../i18n/translations';

interface LanguageContextValue {
  lang: LangType;
  setLang: (lang: LangType) => void;
  t: Translation;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'Eng',
  setLang: () => {},
  t: translations.Eng,
});

export function useLanguage() {
  return useContext(LanguageContext);
}
