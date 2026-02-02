import { useFonts } from 'expo-font';
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'f-bold': require("@/assets/fonts/Onest-Bold.ttf"),
    'f-italic': require("@/assets/fonts/Onest-Medium.ttf"),
    'f-regular': require("@/assets/fonts/Onest-Regular.ttf")        
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: '' }} />
      <Stack.Screen name="product-details" options={{ title: '' }} />
      <Stack.Screen name="read" options={{ title: '' }} />
      <Stack.Screen name="search" options={{ title: '' }} />
    </Stack>
  );
}
