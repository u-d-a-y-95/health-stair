import { UButton } from "@/components/uComponents/uButton";
import { UText } from "@/components/uComponents/uText";
import { hs, ms, ws } from "@/utils/sizes";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useAppTheme } from "@/hooks/useAppTheme";
import { UAccordionItemProps } from "./index.type";
import { ListComponent } from "@/screens/education/components/details-component/list";

export const UAccordionItem = ({
  id,
  title,
  data,
  expanded,
  onExpanded,
  url,
}: UAccordionItemProps) => {
  const { Colors } = useAppTheme();
  const height = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = (event) => {
    const onLayoutHeight = event.nativeEvent.layout.height;
    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setContentHeight(onLayoutHeight);
    }
  };

  useEffect(() => {
    if (expanded === id) {
      height.value = withTiming(contentHeight, {
        duration: 300,
        easing: Easing.linear,
      });
    } else {
      height.value = withTiming(0, { duration: 300, easing: Easing.linear });
    }
  }, [expanded, id, height]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const onPressHandler = () => {
    url && router.push(url);
  };

  const handler = () => {
    if (data) {
      return onExpanded(id);
    }
    onPressHandler();
  };

  return (
    <Pressable onPress={() => handler()}>
      <View style={[styles.card, { borderColor: Colors.borderColor }]}>
        <View style={[styles.header]}>
          <UText size="sm" weight="600" styles={{ flex: 1 }}>
            {title}
          </UText>
          {data && (
            <Ionicons
              name={`${expanded === id ? "chevron-up" : "chevron-down"}`}
              size={16}
              color="black"
            />
          )}
        </View>
        <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
          <View
            style={[{ position: "absolute", width: "100%" }]}
            onLayout={onLayout}
          >
            <View style={[styles.summary]}>
              {data.map((item, index) => (
                <ListComponent key={index} {...item} />
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: ws(5),
    padding: ms(10),
    paddingVertical: hs(15),
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summary: {
    marginVertical: hs(3),
  },
});
