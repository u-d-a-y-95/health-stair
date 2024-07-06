import { Header, getHeaderTitle } from "@react-navigation/elements";
import { StatusBar, TouchableOpacity } from "react-native";
import { ms } from "./sizes";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export const getStackScreenOption = (
  title: string,
  isBackable = false
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
        headerLeft={() =>
          isBackable ? (
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
            >
              <Ionicons name={"arrow-back"} size={ms(22)} />
            </TouchableOpacity>
          ) : null
        }
        headerLeftContainerStyle={{
          paddingLeft: ms(10),
        }}
      />
    ),
  };
};
