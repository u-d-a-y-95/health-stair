import { SafeScreen } from "@/components/safeScreen";
import { UImageSlider } from "@/components/uComponents/uImageSlider";
import { UText } from "@/components/uComponents/uText";
import { workCenters } from "@/data/settings";
import { SCREEN_HEIGHT, hs, ms, ws } from "@/utils/sizes";
import { ScrollView, View } from "react-native";

export const AboutUs = () => {
  return (
    <SafeScreen styles={{ paddingHorizontal: ms(10) }}>
      <ScrollView>
        <UText size="sm" align="justify">
          <UText type="primary" weight="bold">
            {"সিরাক-বাংলাদেশ "}
          </UText>
          ১৯৯১ সালে এর প্রতিষ্ঠালগ্ন থেকেই মানবাধিকার, বাল্যবিয়ে ও যৌন সহিংসতা
          রোধ, নারী, শিশু ও তরুণদের দক্ষতা বৃদ্ধি, গণতান্ত্রিক সচেতনতা, কর্মমুখী
          শিক্ষা, স্বাস্থ্য অধিকার নিশ্চিতকরণের লক্ষ্যে সরকারের সাথে সমন্বয়ের
          মাধ্যমে সারাদেশে সুনামের সাথে বিভিন্ন প্রকার উন্নয়ন কার্যক্রম
          বাস্তবায়ন করছে।
        </UText>
        <UText size="sm" align="justify" styles={{ marginTop: hs(10) }}>
          এছাড়াও স্বেচ্ছাসেবী উন্নয়ন সংস্থা হিসেবে এবং জাতিসংঘের ECOSOC এর সাথে
          বিশেষ পরামর্শক প্রতিষ্ঠান হিসেবে আন্তর্জাতিক পরিমন্ডলে তরুণদের নীতি ও
          উন্নয়নমূলক বিভিন্ন কার্যক্রম করে আসছে। সংস্থাটি সরকারের সমাজসেবা
          অধিদপ্তর, যুব উন্নয়ন অধিদপ্তর এবং মাননীয় প্রধানমন্ত্রীর কার্যালয়ের
          অধীন এনজিও বিষয়ক ব্যুরোতে নিবন্ধিত।
        </UText>

        <View style={[{ marginVertical: hs(10) }]}>
          <UText weight="bold">কর্ম এলাকা</UText>
          <View style={{ marginLeft: ws(10), marginTop: hs(10), gap: hs(6) }}>
            {workCenters.map((val, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: ws(10),
                }}
              >
                <View
                  style={{
                    width: ws(8),
                    height: ws(8),
                    backgroundColor: "black",
                  }}
                ></View>
                <UText size="sm" styles={[{ flex: 1 }]}>
                  {val}
                </UText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};
