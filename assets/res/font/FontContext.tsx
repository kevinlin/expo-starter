import React, { createContext, useContext } from 'react';

interface FontContextProps {
  fontsLoaded: boolean;
}

const FontContext = createContext<FontContextProps>({ fontsLoaded: false });

export const useFontContext = () => useContext(FontContext);

export const FontProvider: React.FC<{ fontsLoaded: boolean }> = ({ fontsLoaded, children }) => {
  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};