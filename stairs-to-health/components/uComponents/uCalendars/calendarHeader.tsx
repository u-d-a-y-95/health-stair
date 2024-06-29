import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ms, ws } from "@/utils/sizes";
import { UText } from "../uText";
import { CalendarHeaderProps } from "./index.type";

const CalendarHeader = ({
  monthNames,
  date,
  nextMonth,
  prevMonth,
  isNextMonthDisabled,
  isPrevMonthDisabled,
}: CalendarHeaderProps) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
      paddingHorizontal: ws(13),
    }}
  >
    <TouchableOpacity onPress={prevMonth} disabled={isPrevMonthDisabled}>
      <Ionicons
        name="chevron-back"
        size={ms(20)}
        color={isPrevMonthDisabled ? "gray" : "black"}
      />
    </TouchableOpacity>
    <UText weight="bold">{`${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`}</UText>
    <TouchableOpacity onPress={nextMonth} disabled={isNextMonthDisabled}>
      <Ionicons
        name="chevron-forward"
        size={ms(20)}
        color={isNextMonthDisabled ? "gray" : "black"}
      />
    </TouchableOpacity>
  </View>
);

export default CalendarHeader;
