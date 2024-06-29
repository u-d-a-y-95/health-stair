import { Provider } from "@/state";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Provider>
        <Slot />
      </Provider>
    </ThemeProvider>
  );
}
