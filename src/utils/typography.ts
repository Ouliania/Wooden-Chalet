import type { LangType } from '../i18n/translations';

const NBSP = '\u00A0';

const TIE_WORDS: Record<LangType, string[]> = {
  Rus: [
    'в', 'с', 'и', 'к', 'о', 'у', 'а', 'на', 'по', 'из', 'от', 'до', 'для',
    'при', 'про', 'без', 'над', 'под', 'со', 'ко', 'во', 'об', 'кто', 'что',
  ],
  Eng: ['a', 'an', 'the', 'in', 'on', 'at', 'to', 'of', 'for', 'with', 'by', 'from', 'as', 'or', 'and'],
};

export function preventHangingWords(text: string, lang: LangType): string {
  let result = text.replace(/ $/, NBSP);

  for (const word of TIE_WORDS[lang]) {
    const pattern = new RegExp(`(^|[\\s(])(${word})\\s+`, 'gi');
    result = result.replace(pattern, `$1$2${NBSP}`);
  }

  return result;
}
