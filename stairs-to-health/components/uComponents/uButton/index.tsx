import { Pressable, View } from "react-native";
import { UText } from "../uText";
import { UButtonProps } from "./index.type";
import { hs, ms, ws } from "@/utils/sizes";
import { useAppTheme } from "@/hooks/useAppTheme";

const Sizes = {
  xs: 6,
  sm: 8,
  md: 16,
  lg: 18,
  xl: 20,
};

export const UButton = ({
  onPress,
  children,
  type = "primary",
  size = "md",
  styles = {},
  disabled = false,
}: UButtonProps) => {
  const { Colors } = useAppTheme();
  const textColor = type === "primary" ? "white" : Colors.primary;
  const { base: baseStyle = {}, label: labelStyle = {} } = styles;
  const buttonSize = Sizes[size] || 16;
  return (
    <Pressable
      onPress={(e) => {
        if (disabled) return;
        onPress && onPress(e);
      }}
    >
      <View
        style={[
          {
            borderWidth: 1,
            borderColor: Colors.primary,
            paddingHorizontal: ws(14),
            paddingVertical: hs(buttonSize),
            borderRadius: ms(6),
            justifyContent: "center",
            alignItems: "center",
            ...(type === "primary" && { backgroundColor: Colors.primary }),
            ...(disabled && { opacity: 0.5 }),
          },
          baseStyle,
        ]}
      >
        <UText
          weight="bold"
          size={size}
          styles={[
            {
              color: textColor,
            },
            labelStyle,
          ]}
        >
          {children}
        </UText>
      </View>
    </Pressable>
  );
};
