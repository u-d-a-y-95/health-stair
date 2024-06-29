import { Text } from "react-native";
import { UTextProps } from "./index.type";
import { Size } from "../index.type";
import { ms } from "@/utils/sizes";
import { useAppTheme } from "@/hooks/useAppTheme";

const TextSizes: Size = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

export const UText = ({
  children,
  weight = "normal",
  size = "md",
  type = "default",
  styles = {},
  align = "left",
  numberOfLines = 0,
}: UTextProps) => {
  const { Colors } = useAppTheme();
  const textColor = type === "primary" ? Colors.primary : Colors.text;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          color: textColor,
          fontWeight: weight,
          fontSize: ms(TextSizes[size]),
          textAlign: align,
        },
        styles,
      ]}
    >
      {children}
    </Text>
  );
};
