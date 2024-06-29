import { FlatList } from "react-native";
import { useState } from "react";
import { USpace } from "@/components/uComponents/uSpace";
import { SafeScreen } from "@/components/safeScreen";
import { ws } from "@/utils/sizes";
import { EmergencyContent } from "@/data/emergency";
import { TopicListItem } from "../education/components/topicListItem";

export const Emergency = () => {
  const [expanded, setExpanded] = useState(null);
  const { subcategories } = EmergencyContent;

  const expandedHandler = (id: any) => {
    setExpanded((value) => {
      if (value === id) return null;
      return id;
    });
  };

  return (
    <SafeScreen styles={{ padding: ws(10), backgroundColor: "white" }}>
      <FlatList
        data={subcategories}
        renderItem={({ item }) => (
          <TopicListItem
            {...item}
            url={`/emergency/${item.id}`}
            expanded={expanded}
            onExpanded={expandedHandler}
          />
        )}
        ItemSeparatorComponent={() => <USpace size={10}></USpace>}
        ListFooterComponent={() => <USpace size={10}></USpace>}
        showsVerticalScrollIndicator={false}
      />
    </SafeScreen>
  );
};
