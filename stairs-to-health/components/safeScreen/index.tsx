import { SafeScreenProps } from "./index.type";
import { SafeAreaView } from "react-native";

export const SafeScreen = ({ children, styles = {} }: SafeScreenProps) => {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: "white",
        },
        styles,
      ]}
    >
      {children}
    </SafeAreaView>
  );
};
