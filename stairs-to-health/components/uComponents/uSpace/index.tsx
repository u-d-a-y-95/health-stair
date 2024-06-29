import { ms } from "@/utils/sizes";
import { USpaceProps } from "./index.type";
import { View } from "react-native";

export const USpace = ({ size, orientation = "horizontal" }: USpaceProps) => {
  return (
    <View
      style={{
        width: orientation === "horizontal" ? "100%" : ms(size),
        height: orientation === "vertical" ? "100%" : ms(size),
      }}
    ></View>
  );
};
