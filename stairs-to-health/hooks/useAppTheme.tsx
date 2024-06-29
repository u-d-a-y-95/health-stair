import { Colors } from "@/utils/Colors";
import { ms } from "@/utils/sizes";
import { Header, getHeaderTitle } from "@react-navigation/elements";
import { StatusBar } from "react-native";

export const useAppTheme = () => {
  const ScreenOptions = {
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
  return {
    Colors: Colors.light,
    ScreenOptions,
  };
};
