import { SCREEN_WIDTH, hs } from "@/utils/sizes";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { UImageSliderProps } from "./index.type";

export const UImageSlider = ({ images, height }: UImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: any) => {
    const slide = Math.ceil(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width
    );
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ height: "100%" }}
      >
        {images.map((image: any, index: number) => (
          <Image
            key={index}
            source={image}
            style={{
              width: SCREEN_WIDTH,
              height: "100%",
              resizeMode: "stretch",
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index: number) => (
          <View
            key={index}
            style={[styles.dot, { opacity: index === activeIndex ? 1 : 0.5 }]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 5,
  },
});
