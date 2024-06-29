import { Stack } from "expo-router";
import { getStackScreenOption } from "../../../utils/navigation";
import { educationList } from "@/data/education";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ ...getStackScreenOption("শিক্ষা কেন্দ্র") }}
      />
      <Stack.Screen
        name="subcategory/[id]"
        options={({ route }) => {
          const { id } = route.params;
          const category = educationList[Number(id) - 1];
          return {
            ...getStackScreenOption(category.categoryTitle),
          };
        }}
      />
      <Stack.Screen
        name="quiz/[id]"
        options={({ route }) => {
          const { id } = route.params;
          const category = educationList[Number(id)];
          return {
            ...getStackScreenOption(category.categoryTitle),
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
              educationList[categoryId].subcategories[subcategoryId - 1].title
            ),
          };
        }}
      />
    </Stack>
  );
}
