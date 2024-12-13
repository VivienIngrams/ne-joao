'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the language types
type Language = 'en' | 'pt';

interface LanguageContextProps {
  language: Language; // Current language
  toggleLanguage: () => void; // Function to toggle language
}

// Create the context
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Create a provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt'); // Default to Portuguese

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'pt' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for consuming the context
export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
