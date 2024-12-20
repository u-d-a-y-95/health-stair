import { SafeScreen } from "@/components/safeScreen";
import { UAccordionItem } from "@/components/uComponents/uAccordionItem";
import { UButton } from "@/components/uComponents/uButton";
import { UCalendar } from "@/components/uComponents/uCalendars";
import { USpace } from "@/components/uComponents/uSpace";
import { UText } from "@/components/uComponents/uText";
import { pregnancyKnowledge } from "@/data/pregnancy";

import { hs, ms } from "@/utils/sizes";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";

export const PregnancyCalculator = () => {
  const [date, setDate] = useState<Date>();

  const [expanded, setExpanded] = useState(null);

  const expandedHandler = (id: any) => {
    setExpanded((value) => {
      if (value === id) return null;
      return id;
    });
  };

  const calculatorBtnHandler = () => {
    router.push(`/pregnancyCalculator/result/${date?.getTime()}`);
  };
  return (
    <SafeScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: ms(10),
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <UText size="sm">
            গর্ভাবস্থা ( যা গর্ভধারণ নামেও পরিচিত) হলো সেই সময়কাল যখন একজন নারীর
            শরীরে এক বা একাধিক ভ্রূণ বৃদ্ধি পায়। গর্ভধারণের পূর্বে প্রয়োজনীয়
            সেবা/পরামর্শের মাধ্যমে একজন নারী অনাকাঙ্ক্ষিত গর্ভাবস্থা রোধসহ
            গর্ভকালীন জটিলতা এড়িয়ে যেতে পারেন।
          </UText>

          <UText weight="bold" styles={{ marginTop: hs(10) }}>
            আপনি কত সপ্তাহের গর্ভবতী তা অনুমান করুন
          </UText>
          <UText size="sm" align="justify" styles={{ marginTop: hs(10) }}>
            আপনার পূর্ববর্তী শেষ মাসিক শুরু হওয়ার তারিখ নির্ণয় করুণ। আপনার যদি
            তারিখ মনে না থাকে, তাহলে নীচের পরামর্শগুলি দেখুন। যদি আপনার মাসিক
            অনিয়মিত হয়, তাহলে আপনি এই গর্ভাবস্থা নির্ধারক ক্যালকুলেটরটি ব্যবহার
            করে সঠিকভাবে আপনার গর্ভাবস্থা নির্ধারণ করতে পারবেন না। এ ক্ষেত্রে
            আপনাকে নিকটস্থ স্বাস্থ্যকেন্দ্রে গিয়ে আল্ট্রাসাউন্ড (সোনোগ্রাম) বা
            গর্ভাবস্থা পরীক্ষা করতে হবে। যদি আপনার তারিখ মনে না থাকে, তাহলে
            নিম্নে উল্লেখিত পরামর্শ গুলো দেখুন।
          </UText>
          <View
            style={{
              marginTop: hs(20),
              backgroundColor: "white",
              paddingVertical: hs(30),
              // borderWidth: 1,
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
        {pregnancyKnowledge.map((item, index) => (
          <View key={index}>
            <UAccordionItem
              {...item}
              expanded={expanded}
              onExpanded={expandedHandler}
            />
            <USpace size={10} />
          </View>
        ))}
      </ScrollView>
      <View style={{ paddingHorizontal: ms(10) }}></View>
    </SafeScreen>
  );
};
