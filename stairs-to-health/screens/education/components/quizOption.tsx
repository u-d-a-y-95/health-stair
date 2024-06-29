import { UText } from "@/components/uComponents/uText";
import { useAppTheme } from "@/hooks/useAppTheme";
import { ms } from "@/utils/sizes";
import { Pressable, StyleSheet, View } from "react-native";
import { QuizOptionProps } from "../index.type";

export const QuizOption = ({
  option,
  isSelected,
  index,
  onPressHandler,
}: QuizOptionProps) => {
  const { Colors } = useAppTheme();
  return (
    <Pressable onPress={() => onPressHandler(index)}>
      <View
        style={[
          styles.container,
          { ...(isSelected && { borderColor: Colors.primary }) },
        ]}
      >
        <UText
          size="sm"
          styles={{
            flex: 1,
            color: Colors.icon,
            ...(isSelected && { color: Colors.primary, fontWeight: "600" }),
          }}
        >
          {option}
        </UText>
        <View
          style={[
            styles.radio,
            { ...(isSelected && { borderColor: Colors.primary }) },
          ]}
        >
          {isSelected && (
            <View
              style={[
                styles.dot,
                { ...(isSelected && { backgroundColor: Colors.primary }) },
              ]}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: ms(12),
    borderWidth: 1,
    borderColor: "#DBE0E5",
    borderRadius: ms(8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  radio: {
    width: ms(20),
    height: ms(20),
    borderWidth: 2,
    borderColor: "#DBE0E5",
    borderRadius: 99999,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: ms(10),
    height: ms(10),
    borderRadius: 99999,
  },
});
