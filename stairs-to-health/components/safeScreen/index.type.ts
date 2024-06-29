import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type SafeScreenProps = {
  children: ReactNode;
  styles?: StyleProp<ViewStyle>;
};
