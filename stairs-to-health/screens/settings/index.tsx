import { UText } from "@/components/uComponents/uText";
import { hs } from "@/utils/sizes";
import { View } from "react-native";
import { SettingsListItem } from "./components/settingsListItems";
import { router } from "expo-router";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAppContext } from "@/state";

export const Settings = () => {
  const { data } = useAppContext();
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
            {data.name}
          </UText>
          <UText size="sm">{data.phone_number}</UText>
          <UText size="sm">{data.district}</UText>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.background,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
          height: "50%",
          paddingTop: 20,
          // justifyContent: "center",
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
    </View>
  );
};
