import { UText } from "@/components/uComponents/uText";
import { hs, ws } from "@/utils/sizes";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SettingsListItemProps } from "../index.type";

export const SettingsListItem = ({
  title,
  onPress,
  url,
}: SettingsListItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(url)}>
      <View style={styles.conatiner}>
        <UText>{title}</UText>
        <Ionicons name="chevron-forward" size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: ws(20),
    paddingVertical: hs(20),
  },
});
