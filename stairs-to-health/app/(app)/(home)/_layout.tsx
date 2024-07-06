import { Stack } from "expo-router";
import { getStackScreenOption } from "../../../utils/navigation";
import { EmergencyContent } from "@/data/emergency";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="emergency"
        options={{
          ...getStackScreenOption("জরুরী সেবা", true),
        }}
      />
      <Stack.Screen
        name="emergency/[id]"
        options={({ route }) => {
          const { id } = route.params;
          return {
            ...getStackScreenOption(
              EmergencyContent.subcategories[id - 1].title,
              true
            ),
          };
        }}
      />
    </Stack>
  );
}
