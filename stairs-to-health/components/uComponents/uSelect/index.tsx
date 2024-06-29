import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { UText } from "../uText";
import { hs } from "@/utils/sizes";

export const USelect = ({ data, onSelect, label }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (item) => {
    setSelectedValue(item);
    onSelect(item);
    setModalVisible(false);
  };

  return (
    <View>
      {label && (
        <UText size="sm" weight="600" styles={{ color: "#121417" }}>
          {label}
        </UText>
      )}
      <TouchableOpacity
        style={[styles.dropdown, { marginTop: hs(5) }]}
        onPress={() => setModalVisible(true)}
      >
        <UText size="sm">
          {selectedValue ? selectedValue.label : "অপশন নির্বাচন করুন"}
        </UText>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { flex: 1 }]}>
            <FlashList
              estimatedItemSize={200}
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
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
  },
  selectedValue: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "50%",
    backgroundColor: "white",
    borderRadius: 5,
    // padding: 10,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
