import { SafeScreen } from "@/components/safeScreen";
import { UText } from "@/components/uComponents/uText";
import { educationList } from "@/data/education";
import React from "react";
import { View } from "react-native";
import { bengaliDigits } from "@/utils";
import { useAppTheme } from "@/hooks/useAppTheme";
import { StatusBar } from "expo-status-bar";
import { hs, ws } from "@/utils/sizes";

export const Result = ({ id }: { id: number }) => {
  const { Colors } = useAppTheme();
  const { categoryTitle, quiz } = educationList[id];

  return (
    <SafeScreen>
      <StatusBar style={"light"} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: ws(10),
        }}
      >
        <UText
          size="xl"
          weight="700"
          styles={{ color: "white" }}
        >{`${categoryTitle}`}</UText>
        <UText
          size="sm"
          weight="500"
          align="justify"
          styles={{ color: "white", marginTop: hs(10) }}
        >
          {quiz.resultMessage}
        </UText>
      </View>
    </SafeScreen>
  );
};
