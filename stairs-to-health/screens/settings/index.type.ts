import { GestureResponderEvent } from "react-native";

export type SettingsListItemProps = {
  title: string;
  url: string;
  onPress: (url: string) => void;
};
