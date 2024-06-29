import EducationDetail from "@/screens/education/datails";
import { useLocalSearchParams } from "expo-router";

export default function EducationDetailScreen() {
  const { id } = useLocalSearchParams();
  const [categoryId, subcategoryId] = id.split(":");
  return (
    <EducationDetail
      categoryId={Number(categoryId)}
      id={Number(subcategoryId) - 1}
    />
  );
}
