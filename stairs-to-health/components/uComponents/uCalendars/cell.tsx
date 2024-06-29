import React from "react";
import { Pressable, View } from "react-native";
import { UText } from "../uText";
import { ws } from "@/utils/sizes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { CellProps } from "./index.type";

const Cell = ({
  onPressHandler,
  active = false,
  value = "",
  color = "",
  disabled = false,
}: CellProps) => {
  const { Colors } = useAppTheme();
  return (
    <Pressable
      onPress={() => {
        if (!onPressHandler || disabled) return null;
        onPressHandler(value);
      }}
    >
      <View
        style={{
          width: ws(45),
          height: ws(45),
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: active ? Colors.primary : "transparent",
          borderRadius: 99999,
        }}
      >
        <UText
          size="sm"
          styles={{
            color,
            ...(active && { color: "white", fontWeight: "900" }),
          }}
        >
          {value}
        </UText>
      </View>
    </Pressable>
  );
};

export default Cell;
