import { getStackScreenOption } from "@/utils/navigation";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[date]"
        options={{
          ...getStackScreenOption("গর্ভাবস্থার ফলাফল", true),
        }}
      />
    </Stack>
  );
}
