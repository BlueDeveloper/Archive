'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  Language,
  translations,
  DEFAULT_LANGUAGE,
  Translations,
} from './index';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations[Language];
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && (savedLanguage in translations)) {
      setLanguageState(savedLanguage);
    }
    setIsMounted(true);
  }, []);

  // Update localStorage and html lang when language changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language, isMounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);

  // If no context available (during SSR), return default ko translations
  if (!context) {
    return {
      language: DEFAULT_LANGUAGE,
      setLanguage: () => {},
      t: translations[DEFAULT_LANGUAGE],
    };
  }

  return context;
}
