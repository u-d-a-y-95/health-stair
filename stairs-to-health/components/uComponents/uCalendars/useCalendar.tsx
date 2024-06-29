import { useState } from "react";
import { Day, UseCalendarResult } from "./index.type";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const weekDaysHeader = ["S", "M", "T", "W", "T", "F", "S"];

const getTotalDays = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDay = (year: number, month: number) =>
  new Date(year, month).getDay();

const useCalendar = (): UseCalendarResult => {
  const [date, setDate] = useState(new Date());

  const getDays = () => {
    const tempDays: Day[][] = [];
    const lastmonthTotalDays = getTotalDays(
      date.getFullYear(),
      date.getMonth() - 1
    );
    const totalDays = getTotalDays(date.getFullYear(), date.getMonth());
    const firstDayInMonth = getFirstDay(date.getFullYear(), date.getMonth());
    const totalCell = Math.ceil((totalDays + firstDayInMonth) / 7) * 7;
    const currentDate = date.getDate();
    const today = new Date();

    for (let index = 0; index < totalCell; index++) {
      if (!tempDays[Math.floor(index / 7)])
        tempDays[Math.floor(index / 7)] = [];
      if (index < firstDayInMonth) {
        tempDays[Math.floor(index / 7)].push({
          value: lastmonthTotalDays - (firstDayInMonth - (index + 1)),
          color: "gray",
          disabled: true,
        });
        continue;
      }
      if (index + 1 > totalDays + firstDayInMonth) {
        tempDays[Math.floor(index / 7)].push({
          value: index + 1 - (totalDays + firstDayInMonth),
          color: "gray",
          disabled: true,
        });
        continue;
      }

      const cellDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        index + 1 - firstDayInMonth
      );
      const isAfterToday = cellDate > today;

      tempDays[Math.floor(index / 7)].push({
        value: index + 1 - firstDayInMonth,
        color: isAfterToday ? "gray" : "black",
        active: currentDate === index + 1 - firstDayInMonth,
        disabled: isAfterToday,
      });
    }

    return tempDays;
  };

  const nextMonth = () => {
    const nextDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    const today = new Date();
    if (nextDate > today) return;
    setDate(nextDate);
  };

  const prevMonth = () => {
    const today = new Date();
    const limitDate = new Date(
      today.getFullYear(),
      today.getMonth() - 10,
      today.getDate() - 20
    );
    const prevDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate()
    );
    if (prevDate < limitDate) return;
    setDate(prevDate);
  };

  const selectDate = (value: number) => {
    setDate(new Date(date.getFullYear(), date.getMonth(), value));
  };

  const days = getDays();
  const today = new Date();
  const isNextMonthDisabled =
    new Date(date.getFullYear(), date.getMonth() + 1) > today;
  const limitDate = new Date(
    today.getFullYear(),
    today.getMonth() - 10,
    today.getDate() - 20
  );
  const isPrevMonthDisabled =
    new Date(date.getFullYear(), date.getMonth() - 1) < limitDate;

  return {
    date,
    days,
    weekDaysHeader,
    monthNames,
    nextMonth,
    prevMonth,
    selectDate,
    isNextMonthDisabled,
    isPrevMonthDisabled,
  };
};

export default useCalendar;
