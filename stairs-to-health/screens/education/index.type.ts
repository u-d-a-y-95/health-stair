import { ImageSourcePropType } from "react-native";

export type EducationListItemProps = {
  id: number;
  categoryTitle: string;
  categoryDescription: string;
  categoryImageUrl: ImageSourcePropType;
  categoryBGColor: string;
};

export type TopicListProps = {
  id: number;
  title: string;
  url: string;
  subtitle: string;
  expanded: number;
  onExpanded: (id: number) => void;
};

export type QuizOptionProps = {
  option: string;
  isSelected: boolean;
  index: number;
  onPressHandler: (number: number) => void;
};
