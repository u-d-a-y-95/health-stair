import { Image, Pressable, StyleSheet, View } from "react-native";
import { ClinicDataProps } from "../../index.type";
import { UText } from "@/components/uComponents/uText";
import { hs, ms } from "@/utils/sizes";
import { router } from "expo-router";

export const ClinicListItem = ({
  name,
  district,
  images,
  url = "/",
}: ClinicDataProps) => {
  const onPressHandler = () => {
    router.push(url);
  };
  return (
    <Pressable onPress={onPressHandler}>
      <View style={[styles.card]}>
        <View style={{ width: "100%", height: hs(250) }}>
          <Image
            source={images[0]}
            style={{
              flex: 1,
              width: "100%",
              resizeMode: "stretch",
            }}
          />
        </View>
        <View style={[styles.main]}>
          <View style={{ flex: 1 }}>
            <UText type="primary" weight="900">
              {name}
            </UText>
            <UText>{district}</UText>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    elevation: 3,
  },
  main: {
    padding: ms(15),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
