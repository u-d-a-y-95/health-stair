import { FieldError } from "react-hook-form";
import { KeyboardTypeOptions } from "react-native";

export type UInputProps = {
  label?: string;
  error?: string;
  onChangeText?: ((text: string) => void) | undefined;
  value?: string | undefined;
  keyboardType?: KeyboardTypeOptions;
};
