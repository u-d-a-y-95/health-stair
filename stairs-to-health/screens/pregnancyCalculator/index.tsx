import { SafeScreen } from "@/components/safeScreen";
import { UButton } from "@/components/uComponents/uButton";
import { UCalendar } from "@/components/uComponents/uCalendars";
import { UText } from "@/components/uComponents/uText";
import { hs, ms } from "@/utils/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export const PregnancyCalculator = () => {
  const [date, setDate] = useState<Date>();

  const calculatorBtnHandler = () => {
    router.push(`/pregnancyCalculator/result/${date?.getTime()}`);
  };
  return (
    <SafeScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          padding: ms(10),
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <UText weight="bold">আপনি কত সপ্তাহের গর্ভবতী তা অনুমান করুন</UText>
          <UText size="sm" align="justify" styles={{ marginTop: hs(10) }}>
            আপনার শেষ মাসিক রক্তপাত শুরু হওয়ার তারিখটি নির্বাচন করুন। আপনার যদি
            অনিয়মিত মাসিক চক্র থাকে, তাহলে এই ক্যালকুলেটরটি সঠিক নাও হতে পারে ।
          </UText>
          <View
            style={{
              marginTop: hs(20),
              backgroundColor: "white",
              paddingVertical: hs(30),
            }}
          >
            <UCalendar
              onChange={(value: Date) => {
                setDate(value);
              }}
            />
          </View>
        </View>
        <View style={{ alignItems: "stretch", marginVertical: hs(20) }}>
          <UButton onPress={calculatorBtnHandler}>গর্ভাবস্থা গণনা করুন</UButton>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};
