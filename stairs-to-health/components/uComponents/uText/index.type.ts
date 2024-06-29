import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Size } from "../index.type";

export type UTextProps = {
  children: ReactNode;
  align?: "left" | "right" | "center" | "justify";
  weight?:
    | "normal"
    | "semibold"
    | "bold"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  type?: "primary" | "default";
  size?: keyof Size;
  styles?: StyleProp<TextStyle>;
  numberOfLines?: number;
};
