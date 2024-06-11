import { useFonts } from 'expo-font';


// Custom hook for loading fonts
export const useCustomFonts = () => {
    const [fontsLoaded] = useFonts({
        'Heavy': require('../../../assets/fonts/SSTHeavy.ttf'),
        'Bold': require('../../../assets/fonts/SSTBold.ttf'),
        'Medium': require('../../../assets/fonts/SSTMedium.ttf'),
        'Light': require('../../../assets/fonts/SSTLight.ttf')
    });
  
    return fontsLoaded;
  };