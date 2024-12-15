import { View } from "react-native";
import { SettingsListItem } from "./components/settingsListItems";
import { router } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";

export const Settings = () => {
  const { Colors } = useAppTheme();
  const navigate = (url: string) => {
    router.push(url);
  };
  return (
    <View
      style={{
        backgroundColor: Colors.background,
        flex: 1,
      }}
    >
      <SettingsListItem
        title="কপি রাইট"
        url="/settings/copyright"
        onPress={navigate}
      />
      <SettingsListItem
        title="আমাদের সম্পর্কে"
        url="/settings/aboutus"
        onPress={navigate}
      />
    </View>
  );
};
