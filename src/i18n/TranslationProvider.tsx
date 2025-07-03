"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { t, languages, currentLanguage } from './index';

// Create the translation context
interface TranslationContextType {
  t: (path: string, params?: Record<string, string | number>) => string;
  currentLanguage: string;
}

const TranslationContext = createContext<TranslationContextType>({
  t,
  currentLanguage
});

// Create a hook for easy access to the translation function
export const useTranslation = () => useContext(TranslationContext);

// Create the provider component
interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  return (
    <TranslationContext.Provider value={{ t, currentLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
