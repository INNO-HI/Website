import { useState } from 'react';
import type { ReactNode } from 'react';
import { LanguageContext } from './LanguageContext';
import type { Lang } from './LanguageContext';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
