import { Result } from "@/screens/education/result";
import { useLocalSearchParams } from "expo-router";

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  return <Result id={id} />;
}
