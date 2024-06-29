import { SafeScreen } from "@/components/safeScreen";
import { UText } from "@/components/uComponents/uText";
import { clinics } from "@/data/clinic";
import { hs, ms } from "@/utils/sizes";
import { router } from "expo-router";
import { ImageBackground, Pressable, View } from "react-native";

export const Clinic = () => {
  return (
    <SafeScreen styles={{ padding: ms(10), backgroundColor: "white" }}>
      <UText weight="500" align="left">
        নিকটস্থ স্বাস্থকেন্দ্র নির্বাচন করুন
      </UText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: ms(10),
          marginTop: hs(10),
        }}
      >
        {clinics.map((item, index) => (
          <Pressable
            key={index}
            style={{ flex: 1, height: ms(150) }}
            onPress={() => {
              router.navigate(`/clinic/clinicCenterList/${item.id}`);
            }}
          >
            <ImageBackground
              style={{
                backgroundColor: item.color,
                flex: 1,
                height: ms(150),
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              // source={require("@/assets/images/react-logo.png")}
            >
              <UText size="lg" weight="600">
                {item.title}
              </UText>
            </ImageBackground>
          </Pressable>
        ))}
      </View>
    </SafeScreen>
  );
};
