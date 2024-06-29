import EmergencyDetail from "@/screens/home/emergencyDetails";
import { useLocalSearchParams } from "expo-router";

export default function EmergencyDetailScreen() {
  const { id } = useLocalSearchParams();
  return <EmergencyDetail id={Number(id) - 1} />;
}
