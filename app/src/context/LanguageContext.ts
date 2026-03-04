import { createContext } from 'react';

export type Lang = 'ko' | 'en';

export interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);
