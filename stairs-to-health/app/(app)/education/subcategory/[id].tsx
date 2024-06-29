import { Subcategory } from "@/screens/education/subcategory";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function EducationTopicScreen() {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href="/" />;
  return <Subcategory id={Number(id) - 1} />;
}
