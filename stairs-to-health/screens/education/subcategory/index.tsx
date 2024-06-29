import { FlatList, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { TopicListItem } from "../components/topicListItem";
import { UButton } from "@/components/uComponents/uButton";
import { USpace } from "@/components/uComponents/uSpace";
import { SafeScreen } from "@/components/safeScreen";
import { educationList } from "@/data/education";
import { hs, ws } from "@/utils/sizes";

export const Subcategory = ({ id }: { id: number }) => {
  const [expanded, setExpanded] = useState(null);
  const { subcategories } = educationList[id];

  const expandedHandler = (id: any) => {
    setExpanded((value) => {
      if (value === id) return null;
      return id;
    });
  };

  const onPressHandler = () => {
    router.push(`/education/quiz/${id}`);
  };

  return (
    <SafeScreen styles={{ padding: ws(10), backgroundColor: "white" }}>
      <FlatList
        data={subcategories}
        renderItem={({ item }) => (
          <TopicListItem
            {...item}
            url={`/education/details/${id}:${item.id}`}
            expanded={expanded}
            onExpanded={expandedHandler}
          />
        )}
        ItemSeparatorComponent={() => <USpace size={10}></USpace>}
        ListFooterComponent={() => <USpace size={10}></USpace>}
        showsVerticalScrollIndicator={false}
      />
      {educationList[id]?.quiz && (
        <View>
          <UButton onPress={onPressHandler}>দক্ষতা যাচাই করুন</UButton>
        </View>
      )}
    </SafeScreen>
  );
};
