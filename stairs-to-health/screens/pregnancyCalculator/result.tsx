import { SafeScreen } from "@/components/safeScreen";
import { UText } from "@/components/uComponents/uText";
import {
  findStageByDays,
  getCurrentPregnancyMonthsWeeks,
  getTotalDays,
} from "@/utils";
import { hs, ms } from "@/utils/sizes";
import { View } from "react-native";

export const Result = ({ date }: { date: string }) => {
  const totalDays = getTotalDays(new Date(Number(date)));
  const currentStage = findStageByDays(totalDays);

  return (
    <SafeScreen styles={{ backgroundColor: "white" }}>
      <View style={{ flex: 1, padding: ms(10) }}>
        <View style={{ flex: 1 }}>
          <UText weight="bold">
            সময় : {getCurrentPregnancyMonthsWeeks(Number(date))}
          </UText>
          <UText size="sm" align="justify" styles={{ marginTop: hs(10) }}>
            {currentStage?.description}
          </UText>
        </View>
      </View>
    </SafeScreen>
  );
};
