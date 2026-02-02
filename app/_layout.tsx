import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'f-bold': require("@/assets/fonts/Onest-Bold.ttf"),
    'f-italic': require("@/assets/fonts/Onest-Medium.ttf"),
    'f-regular': require("@/assets/fonts/Onest-Regular.ttf")        
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
