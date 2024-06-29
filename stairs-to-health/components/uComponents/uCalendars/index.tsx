import React, { useEffect } from "react";
import { View } from "react-native";
import useCalendar from "./useCalendar";
import CalendarHeader from "./calendarHeader";
import WeekHeader from "./weekHeader";
import DayGrid from "./dayGrid";
import { UCalendarProps } from "./index.type";

export const UCalendar = ({ onChange }: UCalendarProps) => {
  const {
    date,
    days,
    weekDaysHeader,
    monthNames,
    nextMonth,
    prevMonth,
    selectDate,
    isNextMonthDisabled,
    isPrevMonthDisabled,
  } = useCalendar();

  useEffect(() => {
    onChange(date);
  }, [date]);
  return (
    <View style={{ alignItems: "center" }}>
      <View>
        <CalendarHeader
          monthNames={monthNames}
          date={date}
          nextMonth={nextMonth}
          prevMonth={prevMonth}
          isNextMonthDisabled={isNextMonthDisabled}
          isPrevMonthDisabled={isPrevMonthDisabled}
        />
        <WeekHeader weekDaysHeader={weekDaysHeader} />
        <DayGrid days={days} selectDate={selectDate} />
      </View>
    </View>
  );
};
