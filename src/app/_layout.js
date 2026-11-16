import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// The root layout wraps every screen.
// GestureHandlerRootView is needed so touch gestures (tap, drag) work.
// Stack gives us a header with a back button on every screen.
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Code Examples" }} />
        <Stack.Screen name="graphs" options={{ title: "1. Graphs" }} />
        <Stack.Screen name="matrix" options={{ title: "2. Matrix" }} />
        <Stack.Screen name="gooey" options={{ title: "3. Gooey Menu" }} />
        <Stack.Screen name="carousel" options={{ title: "4. Carousel" }} />
        <Stack.Screen name="menu" options={{ title: "5. Native Menu" }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
