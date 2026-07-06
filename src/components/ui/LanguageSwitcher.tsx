import { useLanguage } from '../../context/LanguageContext';
import type { LangType } from '../../i18n/translations';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const options: { value: LangType; label: string }[] = [
    { value: 'Eng', label: 'En' },
    { value: 'Rus', label: 'Ru' },
  ];

  return (
    <div className="nav-text flex items-center gap-1 font-normal text-text-white">
      {options.map((opt, i) => (
        <span key={opt.value} className="flex items-center gap-1">
          {i > 0 && <span className="text-text-white/50">/</span>}
          <button
            type="button"
            onClick={() => setLang(opt.value)}
            className={`cursor-pointer transition-colors ${
              lang === opt.value ? 'text-text-white' : 'text-text-white/60 hover:text-text-white'
            }`}
          >
            {opt.label}
          </button>
        </span>
      ))}
    </div>
  );
}
