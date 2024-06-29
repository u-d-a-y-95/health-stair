import { SafeScreen } from "@/components/safeScreen";
import { UText } from "@/components/uComponents/uText";
import { SCREEN_HEIGHT, hs, ms, ws } from "@/utils/sizes";
import { Image, ScrollView, View } from "react-native";
import { QRCode } from "./components/qrcode";

export const Copyright = () => {
  return (
    <SafeScreen
      styles={{
        paddingHorizontal: ms(10),
        paddingTop: ms(10),
        backgroundColor: "white",
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={[{ flex: 1 }]}>
        <View style={{ flex: 1 }}>
          <UText weight="900">কপিরাইট</UText>
          <UText size="sm" align="justify" styles={{ marginTop: hs(10) }}>
            মোবাইল অ্যাপ্লিকেশনটি ("<UText weight="bold">স্বাস্থ্যসিঁড়ি</UText>
            ") সিরাক-বাংলাদেশ কর্তৃক পরিচালিত SAAF/International Planned
            Parenthood Federation (IPPF) এর সহযোগিতায় নিরাপদ প্রজনন স্বাস্থ্য
            সচেতনতা উন্নয়ন প্রকল্পের অধীন প্রজনন স্বাস্থ্য বিষয়ে সকলের মধ্যে
            সচেতনতা বৃদ্ধি, সঠিক তথ্য এবং স্বাস্থ্যকেন্দ্রে সহজ অভিগম্যতা
            নিশ্চিত করার লক্ষ্যে প্রস্তুত করা হয়েছে। এটি শুধুমাত্র কমিউনিটিতে
            সচেতনতা তৈরী ও ব্যাক্তিগত শিক্ষার জন্য তৈরী করা হয়েছে।
          </UText>
          <UText
            size="sm"
            weight="bold"
            align="justify"
            styles={{ marginTop: hs(20) }}
          >
            আমাদের কার্যক্রম সম্পর্কে বিস্তারিত জানতে ভিজিট করুন
          </UText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: ws(30),
            marginTop: hs(15),
            minHeight: SCREEN_HEIGHT / 4,
          }}
        >
          <QRCode
            imageUrl={require("@/assets/images/settings/copyright/facebook.png")}
            url="https://www.facebook.com/seracbangladesh?mibextid=ZbWKwL"
            label="ফেসবুক"
          />
          <QRCode
            imageUrl={require("@/assets/images/settings/copyright/website.jpg")}
            url="https://www.serac-bd.org"
            label="ওয়েবসাইট"
          />
        </View>

        <View
          style={[
            {
              marginTop: hs(20),
              flexDirection: "row",
              alignItems: "center",
              gap: ws(20),
            },
          ]}
        >
          <Image
            style={{ flex: 1, height: hs(60) }}
            source={require("@/assets/images/settings/copyright/serac.png")}
            resizeMode="stretch"
          />
          <Image
            style={{ flex: 1, height: hs(60) }}
            source={require("@/assets/images/settings/copyright/saaf.png")}
            resizeMode="stretch"
          />
          <Image
            style={{ flex: 1, height: hs(60) }}
            source={require("@/assets/images/settings/copyright/ippf.png")}
            resizeMode="stretch"
          />
        </View>
      </ScrollView>
    </SafeScreen>
  );
};
