import { SafeScreen } from "@/components/safeScreen";
import { hs, ms } from "@/utils/sizes";
import { Image, Linking, Pressable, ScrollView, View } from "react-native";
import { UText } from "@/components/uComponents/uText";
import { ClinicDataProps } from "../index.type";
import { UImageSlider } from "@/components/uComponents/uImageSlider";

export const ClinicDetail = ({ data }: { data: ClinicDataProps }) => {
  const { details, location, name, district, images, maps, coordinates } = data;

  const onPressHandler = () => {
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    Linking.openURL(`geo:0,0?q=${latitude},${longitude}`);
  };

  return (
    <SafeScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UImageSlider images={images} height={hs(300)} />
        <View style={{ padding: ms(12) }}>
          <View>
            <UText type="primary" size="lg" weight="900">
              {name}
            </UText>
            <UText size="sm" weight="bold">
              {district}
            </UText>
          </View>

          <UText
            weight="normal"
            size="sm"
            styles={[{ textAlign: "justify", marginVertical: hs(16) }]}
          >
            {details}
          </UText>
          <View>
            <UText
              type="default"
              weight="900"
              styles={[{ textAlign: "justify" }]}
            >
              অবস্থান
            </UText>
            <UText
              size="sm"
              styles={[{ textAlign: "justify", marginTop: hs(5) }]}
            >
              {location}
            </UText>
          </View>

          <Pressable onPress={onPressHandler}>
            <Image
              source={maps[0]}
              style={{
                width: "100%",
                height: hs(300),
                resizeMode: "stretch",
                marginVertical: hs(16),
              }}
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};
