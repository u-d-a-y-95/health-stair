import { Image, Pressable, View } from "react-native";
import { EducationListItemProps } from "../index.type";
import { router } from "expo-router";
import { hs, ws } from "@/utils/sizes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { UText } from "@/components/uComponents/uText";

export const EducationListItem = ({
  id,
  categoryTitle,
  categoryDescription,
  categoryImageUrl,
  categoryBGColor,
}: EducationListItemProps) => {
  const { Colors } = useAppTheme();
  const onPressHandler = () => {
    router.navigate(`/education/subcategory/${id}`);
  };
  return (
    <Pressable onPress={onPressHandler}>
      <View
        style={{
          height: hs(100),
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.background,
          elevation: 1,
          borderWidth: 1,
          borderColor: Colors.borderColor,
        }}
      >
        <Image
          source={categoryImageUrl}
          style={{
            width: hs(100),
            height: "100%",
            backgroundColor: categoryBGColor,
          }}
          resizeMode="cover"
        />

        <View style={{ flex: 1, padding: ws(10), justifyContent: "center" }}>
          <UText size="sm" weight="600">
            {categoryTitle}
          </UText>
          <UText
            size="xs"
            align="justify"
            styles={{ marginTop: hs(5) }}
            numberOfLines={3}
          >
            {categoryDescription}
          </UText>
        </View>
      </View>
    </Pressable>
  );
};
