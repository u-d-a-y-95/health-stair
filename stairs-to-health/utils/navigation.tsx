import { Header, getHeaderTitle } from "@react-navigation/elements";
import { StatusBar } from "react-native";
import { ms } from "./sizes";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

export const getStackScreenOption = (
  title: string
): NativeStackNavigationOptions => {
  return {
    headerTitle: title,
    headerTitleStyle: {
      fontSize: ms(17),
      fontWeight: "900",
    },

    header: ({ options, route }) => (
      <Header
        title={getHeaderTitle(options, route.name)}
        headerTitleAlign="center"
        headerStatusBarHeight={StatusBar.currentHeight}
      />
    ),
  };
};
