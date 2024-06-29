import { clinics } from "@/data/clinic";
import { ClinicDetail } from "@/screens/clinic/details";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function ClinicDetailScreen() {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href={"/"} />;
  const [parentId, subcategoryId] = (id as string).split(":");
  return (
    <ClinicDetail
      data={clinics[Number(parentId) - 1].list[Number(subcategoryId) - 1]}
    />
  );
}
