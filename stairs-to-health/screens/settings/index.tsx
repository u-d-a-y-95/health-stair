import { UText } from "@/components/uComponents/uText";
import { hs } from "@/utils/sizes";
import { View } from "react-native";
import { SettingsListItem } from "./components/settingsListItems";
import { router } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";

export const Settings = ({}) => {
  const { Colors } = useAppTheme();
  const navigate = (url: string) => {
    router.push(url);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#e9f4fc" }}>
      <View
        style={{
          minHeight: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center", marginVertical: hs(10) }}>
          <UText size="xl" weight="bold" type="primary">
            রহিমা খাতুন
          </UText>
          <UText size="sm">+8801830546042</UText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.background,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          height: "50%",
          justifyContent: "center",
        }}
      >
        <SettingsListItem title="প্রোফাইল" url="" onPress={navigate} />
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
    </View>
  );
};
