import { Stack } from "expo-router";
import { getStackScreenOption } from "../../../utils/navigation";
import { clinics } from "@/data/clinic";

export default function ClinicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ ...getStackScreenOption("স্বাস্থ্য কেন্দ্র") }}
      />
      <Stack.Screen
        name="clinicCenterList/[id]"
        options={({ route }) => {
          const { id } = route.params;
          const category = clinics[Number(id) - 1];
          return {
            ...getStackScreenOption(category.title),
          };
        }}
      />
      <Stack.Screen
        name="details/[id]"
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
      />
    </Stack>
  );
}
