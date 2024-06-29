import { Image, Pressable, View } from "react-native";
import { router } from "expo-router";
import { hs, ws } from "@/utils/sizes";
import { useAppTheme } from "@/hooks/useAppTheme";
import { UText } from "@/components/uComponents/uText";
import { EducationListItemProps } from "@/screens/education/index.type";

export const EmergencyCard = ({
  id,
  categoryTitle,
  categoryDescription,
  categoryImageUrl,
  categoryBGColor,
}: EducationListItemProps) => {
  const { Colors } = useAppTheme();
  const onPressHandler = () => {
    router.navigate(`/emergency`);
  };
  return (
    <Pressable onPress={onPressHandler}>
      <View
        style={{
          height: 150,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.background,
          borderWidth: 1,
          borderColor: "#C8C8C8",
        }}
      >
        <Image
          source={categoryImageUrl}
          style={{
            width: "35%",
            height: "100%",
            backgroundColor: categoryBGColor,
          }}
          resizeMode="cover"
        />

        <View
          style={{
            flex: 1,
            padding: ws(10),
            justifyContent: "center",
            gap: hs(5),
          }}
        >
          <UText size="md" weight="600">
            {categoryTitle}
          </UText>
          <UText size="xs" align="justify" styles={{}} numberOfLines={5}>
            {categoryDescription}
          </UText>
        </View>
      </View>
    </Pressable>
  );
};
