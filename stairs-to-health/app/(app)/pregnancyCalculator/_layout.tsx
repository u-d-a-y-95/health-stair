import { Stack } from "expo-router";
import { useAppTheme } from "../../../hooks/useAppTheme";

export default function PregnancyCalculatorLayout() {
  const { ScreenOptions } = useAppTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...ScreenOptions,
          headerTitle: "গর্ভাবস্থা ক্যালকুলেটর",
        }}
      />
      <Stack.Screen name="result" options={{ headerShown: false }} />
    </Stack>
  );
}
