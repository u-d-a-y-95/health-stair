import { Stack } from "expo-router";
import { getStackScreenOption } from "../../../utils/navigation";

export default function SettingsRootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ ...getStackScreenOption("সেটিংস") }}
      />
      <Stack.Screen name="aboutus" options={{ headerShown: false }} />
      <Stack.Screen
        name="copyright"
        options={{
          ...getStackScreenOption("কপি রাইট"),
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          ...getStackScreenOption("প্রোফাইল"),
        }}
      />
    </Stack>
  );
}
