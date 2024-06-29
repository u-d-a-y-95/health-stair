import { Result } from "@/screens/pregnancyCalculator/result";
import { useLocalSearchParams } from "expo-router";

export default function ResultScreen() {
  const { date = "" } = useLocalSearchParams();
  return <Result date={date as string} />;
}
