import { Tabs } from "expo-router";
import { TabbarIcon } from "./tabbar-icon";
import { TabProps } from "./index.type";

export const TabScreenLisner = ({ navigation }) => {
  return {
    tabPress: () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "index" }],
      });
    },
  };
};
