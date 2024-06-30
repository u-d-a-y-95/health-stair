import { SafeScreen } from "@/components/safeScreen";
import { USpace } from "@/components/uComponents/uSpace";
import { UText } from "@/components/uComponents/uText";
import { educationList } from "@/data/education";
import { useAppContext } from "@/state";
import { shuffleArray } from "@/utils";
import { hs, ms, ws } from "@/utils/sizes";
import { FlashList } from "@shopify/flash-list";
import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { EmergencyContent } from "@/data/emergency";
import { EducationCard } from "./components/educationCard";
import { EmergencyCard } from "./components/emergencyCard";
import { router } from "expo-router";
import { UButton } from "@/components/uComponents/uButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = () => {
  const { data } = useAppContext();
  console.log(data);
  return (
    <SafeScreen
      styles={{
        paddingTop: hs(40),
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: ws(10),
            backgroundColor: "#e9f4fc",
            padding: ms(10),
            paddingVertical: 30,
          }}
        >
          <UText size="xl" weight="900" type="primary">
            {data.name}
          </UText>
          <UText size="sm">{data.phone_number}</UText>
        </View>
        <View style={{ marginTop: hs(20) }}>
          <View
            style={{
              height: ms(250),
              justifyContent: "center",
            }}
          >
            <FlashList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={shuffleArray(educationList)}
              renderItem={({ item }) => <EducationCard {...item} />}
              ItemSeparatorComponent={() => (
                <USpace orientation="vertical" size={10} />
              )}
              ListFooterComponent={() => (
                <USpace orientation="vertical" size={10} />
              )}
              ListHeaderComponent={() => (
                <USpace orientation="vertical" size={10} />
              )}
              estimatedItemSize={200}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        <Pressable onPress={() => router.navigate("/pregnancyCalculator")}>
          <View
            style={{
              backgroundColor: "#e9f4fc",
              height: hs(150),
              marginHorizontal: ws(10),
              marginTop: hs(20),
              padding: ms(10),
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: hs(130),
                height: hs(140),
                position: "absolute",
                left: -10,
                top: -20,
                transform: [
                  {
                    rotateZ: "-15deg",
                  },
                ],
                opacity: 0.25,
              }}
              resizeMode="cover"
              source={require("@/assets/images/calendar.png")}
            />
            <UText size="lg" weight="900" align="center" type="primary">
              আপনি কত সপ্তাহের গর্ভবতী তা অনুমান করুন
            </UText>
          </View>
        </Pressable>

        <View
          style={{
            marginHorizontal: ms(10),
            marginVertical: hs(20),
          }}
        >
          <EmergencyCard {...EmergencyContent} />
        </View>

        <UButton
          onPress={async () => {
            console.log("hello");
            await AsyncStorage.clear();
          }}
        >
          Clear
        </UButton>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: ws(16),
    gap: ws(16),
  },
  profile: {
    width: ws(80),
    height: ws(80),
    backgroundColor: "gray",
    borderRadius: 9999,
  },
});
