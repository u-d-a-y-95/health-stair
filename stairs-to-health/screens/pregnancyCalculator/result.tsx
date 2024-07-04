import { SafeScreen } from "@/components/safeScreen";
import { UText } from "@/components/uComponents/uText";
import {
  findStageByDays,
  getCurrentPregnancyMonthsWeeks,
  getTotalDays,
} from "@/utils";
import { hs, ms } from "@/utils/sizes";
import { ScrollView, View } from "react-native";
import { ListComponent } from "../education/components/details-component/list";

export const Result = ({ date }: { date: string }) => {
  const totalDays = getTotalDays(new Date(Number(date)));
  const currentStage = findStageByDays(totalDays);

  return (
    <SafeScreen styles={{ backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
          <View style={{ flex: 1 }}>
            <UText size="sm" weight="700" align="justify">
              {currentStage?.title}
            </UText>
            <UText size="sm">
              <UText weight="800">সময় : </UText>
              {getCurrentPregnancyMonthsWeeks(Number(date))}
            </UText>
            {currentStage?.description?.map((item, index) => (
              <ListComponent key={index} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};
