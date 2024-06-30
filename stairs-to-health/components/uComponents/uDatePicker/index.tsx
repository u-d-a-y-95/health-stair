import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { UText } from "../uText";
import { hs, ms } from "@/utils/sizes";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

export const UDatePicker = ({ value, onChange: changeHandler, label }) => {
  const [date, setDate] = useState(value ? new Date(value) : new Date());

  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        setDate(parsedDate);
      }
    }
  }, [value]);

  const onChange = (_event, selectedDate) => {
    changeHandler(selectedDate);
    setDate(selectedDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
    });
  };

  return (
    <View>
      {label && (
        <UText size="sm" weight="600" styles={{ color: "#121417" }}>
          {label}
        </UText>
      )}
      <View style={[styles.dropdown, { marginTop: hs(5) }]}>
        <UText size="sm">{value ? date.toDateString() : ""}</UText>
        <TouchableOpacity onPress={showDatepicker}>
          <Ionicons name="calendar-outline" size={ms(22)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedValue: {
    fontSize: 16,
  },
});
