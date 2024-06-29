import { ImageSourcePropType } from "react-native";

export type ClinicDataProps = {
  url?: string;
  id: number;
  district: string;
  name: string;
  established: number | null;
  location: string;
  details: string;
  images: ImageSourcePropType[];
  maps: ImageSourcePropType[];
  coordinates: number[];
};
