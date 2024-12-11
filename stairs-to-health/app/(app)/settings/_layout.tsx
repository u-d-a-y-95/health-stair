import { Stack } from "expo-router";
import { getStackScreenOption } from "../../../utils/navigation";

export default function SettingsRootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ ...getStackScreenOption("সেটিংস") }}
      />
      <Stack.Screen
        name="aboutus"
        options={{
          ...getStackScreenOption("আমাদের সম্পর্কে", true),
        }}
      />
      <Stack.Screen
        name="copyright"
        options={{
          ...getStackScreenOption("কপি রাইট", true),
        }}
      />
    </Stack>
  );
}
