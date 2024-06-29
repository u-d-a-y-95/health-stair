import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Size } from "../index.type";

export type UButtonProps = {
  disabled?: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  children?: ReactNode;
  type?: "primary" | "outline";
  size?: keyof Size;
  styles?: {
    base?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
  };
};
