import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AllergyModeContextType {
  isAllergyModeOn: boolean;
  toggleAllergyMode: () => void;
  setAllergyMode: (value: boolean) => void;
}

const AllergyModeContext = createContext<AllergyModeContextType | undefined>(undefined);

export const AllergyModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAllergyModeOn, setIsAllergyModeOn] = useState(() => {
    const stored = localStorage.getItem('allergy_mode');
    return stored ? JSON.parse(stored) : true;
  });

  useEffect(() => {
    localStorage.setItem('allergy_mode', JSON.stringify(isAllergyModeOn));
  }, [isAllergyModeOn]);

  const toggleAllergyMode = () => {
    setIsAllergyModeOn((prev: boolean) => !prev);
  };

  const setAllergyMode = (value: boolean) => {
    setIsAllergyModeOn(value);
  };

  return (
    <AllergyModeContext.Provider
      value={{
        isAllergyModeOn,
        toggleAllergyMode,
        setAllergyMode,
      }}
    >
      {children}
    </AllergyModeContext.Provider>
  );
};

export const useAllergyMode = () => {
  const context = useContext(AllergyModeContext);
  if (context === undefined) {
    throw new Error('useAllergyMode must be used within an AllergyModeProvider');
  }
  return context;
};
