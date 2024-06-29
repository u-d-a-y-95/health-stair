import { Image, Pressable, View } from "react-native";
import { router } from "expo-router";
import { hs, ms, ws } from "@/utils/sizes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { UText } from "@/components/uComponents/uText";
import { EducationListItemProps } from "@/screens/education/index.type";

export const EducationCard = ({
  id,
  categoryTitle,
  categoryDescription,
  categoryImageUrl,
  categoryBGColor,
}: EducationListItemProps) => {
  const { Colors } = useAppTheme();
  const onPressHandler = () => {
    router.push(`/education/subcategory/${id}`);
  };
  return (
    <Pressable onPress={onPressHandler}>
      <View
        style={{
          backgroundColor: Colors.background,
          width: ms(170),
          borderWidth: 1,
          borderColor: Colors.borderColor,
          height: "100%",
        }}
      >
        <Image
          source={categoryImageUrl}
          style={{
            flex: 1,
            width: "100%",
            height: ms(120),
            backgroundColor: categoryBGColor,
          }}
          resizeMode="cover"
        />

        <View
          style={{
            flex: 1,
            padding: ms(10),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UText size="sm" weight="600" align="center">
            {categoryTitle}
          </UText>
          <UText
            size="xs"
            align="justify"
            styles={{ marginTop: hs(10) }}
            numberOfLines={4}
          >
            {categoryDescription}
          </UText>
        </View>
      </View>
    </Pressable>
  );
};
