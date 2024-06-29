import React from "react";
import { View } from "react-native";
import Cell from "./cell";
import { WeekHeaderProps } from "./index.type";

const WeekHeader = ({ weekDaysHeader }: WeekHeaderProps) => (
  <View style={{ flexDirection: "row" }}>
    {weekDaysHeader.map((header, index) => (
      <Cell key={index} value={header} color="" disabled />
    ))}
  </View>
);

export default WeekHeader;
