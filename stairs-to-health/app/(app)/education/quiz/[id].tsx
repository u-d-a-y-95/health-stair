import { Quiz } from "@/screens/education/quiz";
import { useLocalSearchParams } from "expo-router";

export default function QuizScreen() {
  const { id } = useLocalSearchParams();
  return <Quiz id={id} />;
}
