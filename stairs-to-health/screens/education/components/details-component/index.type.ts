import { ImageSourcePropType } from "react-native";

export type PlainTextComponentProps = {
  title: string;
  description: string[];
};
export type ImageComponentProps = {
  title?: string;
  imageText?: string;
  url: ImageSourcePropType;
};
export type ListComponentProps = {
  align?: "left" | "right" | "center" | "justify";
  title?: string;
  subtitle?: string;
  children: ListComponentProps[];
};
