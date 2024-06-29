import { clinics } from "@/data/clinic";
import { ClinicList } from "@/screens/clinic/clinicList";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function clinicCenterListScreen() {
  const { id } = useLocalSearchParams();
  if (!id) return <Redirect href="/" />;
  return (
    <ClinicList parentId={Number(id)} list={clinics[Number(id) - 1].list} />
  );
}
