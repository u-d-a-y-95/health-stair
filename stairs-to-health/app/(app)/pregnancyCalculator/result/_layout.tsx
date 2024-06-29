import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { ScreenOptions } = useAppTheme();
  return (
    <Stack
      screenOptions={{
        ...ScreenOptions,
      }}
    >
      <Stack.Screen
        name="[date]"
        options={{ headerTitle: "গর্ভাবস্থার ফলাফল" }}
      />
    </Stack>
  );
}
