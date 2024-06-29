import { hs, ms } from "@/utils/sizes";
import { TextInput, View } from "react-native";
import { UText } from "../uText";
import { UInputProps } from "./index.type";

export const UInput = ({
  label,
  error,
  onChangeText,
  value,
  keyboardType,
}: UInputProps) => {
  return (
    <View>
      {label && (
        <UText size="sm" weight="600" styles={{ color: "#121417" }}>
          {label}
        </UText>
      )}

      <TextInput
        style={{
          padding: ms(10),
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginTop: hs(5),
        }}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
      />
      {error && (
        <UText size="sm" styles={{ color: "#EF5350" }}>
          *{error}
        </UText>
      )}
    </View>
  );
};
