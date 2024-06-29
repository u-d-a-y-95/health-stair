import React from "react";
import { View } from "react-native";
import Cell from "./cell";
import { DayGridProps } from "./index.type";

const DayGrid = ({ days, selectDate }: DayGridProps) => (
  <View style={{ flexDirection: "column" }}>
    {days.map((row, index) => (
      <View
        key={index}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {row.map((col, colindex) => (
          <Cell
            key={colindex}
            {...col}
            value={col.value.toString()}
            onPressHandler={(val) => selectDate(Number(val))}
          />
        ))}
      </View>
    ))}
  </View>
);

export default DayGrid;
