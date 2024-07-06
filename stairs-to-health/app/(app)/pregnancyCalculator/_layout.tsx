import { Stack } from "expo-router";
import { getStackScreenOption } from "@/utils/navigation";

export default function PregnancyCalculatorLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          ...getStackScreenOption("গর্ভাবস্থা ক্যালকুলেটর"),
        }}
      />
      <Stack.Screen name="result" options={{ headerShown: false }} />
    </Stack>
  );
}
