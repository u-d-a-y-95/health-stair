import { ImageSourcePropType } from "react-native";

export type QRCodeProps = {
  imageUrl: ImageSourcePropType;
  url?: string;
  label?: string;
};
