import { Stack } from "expo-router";
import { getStackScreenOption } from "../../../utils/navigation";
import { educationList } from "@/data/education";
import { Ionicons } from "@expo/vector-icons";
import { ms } from "@/utils/sizes";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ ...getStackScreenOption("স্বাস্থ্য তথ্য") }}
      />
      <Stack.Screen
        name="subcategory/[id]"
        options={({ route }) => {
          const { id } = route.params;
          const category = educationList[Number(id) - 1];
          return {
            ...getStackScreenOption(category.categoryTitle, true),
          };
        }}
      />
      <Stack.Screen
        name="quiz/[id]"
        options={({ route }) => {
          const { id } = route.params;
          const category = educationList[Number(id)];
          return {
            ...getStackScreenOption(category.categoryTitle, true),
          };
        }}
      />
      <Stack.Screen
        name="result/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={({ route }) => {
          const { id } = route.params;
          const [categoryId, subcategoryId] = id.split(":");
          return {
            ...getStackScreenOption(
              educationList[categoryId].subcategories[subcategoryId - 1].title,
              true
            ),
          };
        }}
      />
    </Stack>
  );
}
