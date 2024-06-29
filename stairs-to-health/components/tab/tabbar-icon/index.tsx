import { ms } from "@/utils/sizes";
import { TabbarIconProps } from "./index.type";
import { Ionicons } from "@expo/vector-icons";

export const TabbarIcon = ({
  name,
  color = "#000",
  size = 25,
}: TabbarIconProps) => {
  return <Ionicons name={name} size={ms(size)} color={color} />;
};
