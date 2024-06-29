import { Ionicons } from "@expo/vector-icons";

export type TabbarIconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
};
