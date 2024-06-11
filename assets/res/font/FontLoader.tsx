// src/components/FontLoader.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useCustomFonts } from '../font/useCustomFonts';
import { FontProvider } from '../font/FontContext';

// Define the props type for the FontLoader component
interface FontLoaderProps {
  children: React.ReactNode; // Accepting any valid React node as children
}

const FontLoader: React.FC<FontLoaderProps> = ({ children }) => {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FontProvider fontsLoaded={fontsLoaded}>
      {children}
    </FontProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FontLoader;
