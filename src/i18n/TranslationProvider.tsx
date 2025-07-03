"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { en } from './en';

// Language configuration
export const languages = {
  en,
};

// Current language - can be expanded for multi-language support
export const currentLanguage = 'en';

/**
 * Get a translation string by key path
 * @param path - Dot notation path to the translation string
 * @param params - Optional parameters to replace in the translation string
 * @returns The translated string with parameters replaced
 */
export const t = (path: string, params?: Record<string, string | number>): string => {
  const keys = path.split('.');
  let value: any = languages[currentLanguage as keyof typeof languages];
  
  // Navigate through the object using the path
  for (const key of keys) {
    if (value && value[key]) {
      value = value[key];
    } else {
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
  }
  
  // Replace parameters in the string if provided
  if (params && typeof value === 'string') {
    return Object.entries(params).reduce((str, [key, val]) => {
      return str.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
    }, value);
  }
  
  return value;
};

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
