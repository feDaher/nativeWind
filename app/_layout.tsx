// app/_layout.tsx
// import '../../global.css';
import { Stack } from "expo-router";
import "../global.css";
import "nativewind/tailwind.css";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tela inicial */}
      <Stack.Screen 
        name="screens/Home" 
        options={{ title: "Home" }} 
      />

      {/* Tela da calculadora */}
      <Stack.Screen 
        name="screens/Calculator" 
        options={{ title: "Calculadora" }} 
      />
    </Stack>
  );
}
