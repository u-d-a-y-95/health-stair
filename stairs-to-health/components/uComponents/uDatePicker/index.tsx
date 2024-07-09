import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { UText } from "../uText";
import { hs, ms } from "@/utils/sizes";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import { UButton } from "../uButton";
import { useAppTheme } from "@/hooks/useAppTheme";

export const UDatePicker = ({ value, onChange: changeHandler, label }) => {
  const { Colors } = useAppTheme();
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : new Date()
  );
  const [date, setDate] = useState(value ? new Date(value) : new Date());
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate)) {
        setDate(parsedDate);
        setSelectedDate(parsedDate);
      }
    }
  }, [value]);

  const onChange = (params) => {
    setDate(params.date);
  };

  const showDatepicker = () => {
    setModalVisible(true);
  };

  return (
    <View>
      {label && (
        <UText size="sm" weight="600" styles={{ color: "#121417" }}>
          {label}
        </UText>
      )}
      <View style={[styles.dropdown, { marginTop: hs(5) }]}>
        <UText size="sm">{value ? selectedDate.toDateString() : ""}</UText>
        <TouchableOpacity onPress={showDatepicker}>
          <Ionicons name="calendar-outline" size={ms(22)} />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent]}>
            <DateTimePicker
              selectedItemColor={Colors.primary}
              mode="single"
              date={date}
              onChange={onChange}
            />
            <View style={[styles.footer]}>
              <UButton
                size="sm"
                type="outline"
                onPress={() => setModalVisible(false)}
              >
                Cancel
              </UButton>
              <UButton
                size="sm"
                onPress={() => {
                  setSelectedDate(new Date(date));
                  changeHandler(new Date(date));
                  setModalVisible(false);
                }}
              >
                Ok
              </UButton>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  selectedValue: {
    fontSize: 16,
  },
});
